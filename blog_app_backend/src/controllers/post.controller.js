import mongoose from "mongoose";
import { Content } from "../models/content.model.js";
import { Post } from "../models/post.model.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Appreciation } from "../models/appreciation.model.js";

// Code for a Function to Call the GPT API
const generatePostMetadata = async (title, description, content) => {
  // 1. Construct the User Prompt
  const userPrompt = `Blog Title: ${title}\nDescription: ${description}\nContent: ${content}\n\nPlease provide response in JSON format having fields "summary" "minutesRead" and "tags". Just give me the "result" such that, the "result.response.text()" is in this form:- \n 
  {
  "summary": "Post's Summary not more than 450 letters.",
  "minutesRead": intValue,
  "tags": [
    "tag_1",
    "tag_2",
    "tag_3",
    "tag_4",
    "tag_5"
  ]
}\n
Ofcourse it will be stringified, but I can simply do  JSON.parse() on it to return the response as object. \n
 :\n1. A short summary of 4 to 6 lines only.\n2. Estimated reading time of the Content (in minutes).\n3. Array of strings of relevant tags telling category of this post.`;

  try {
    // 2. Initialize the Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Make sure to set environment variable

    // 3. Select the model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Or other model name

    // 4. Construct the chat prompt
    const chat = model.startChat({
      generationConfig: {
        temperature: 1,
      },
    });

    // 5. Send the prompt and get response
    const result = await chat.sendMessage(userPrompt);
    const response = result.response.text();
    const slicedResponse = response.slice(7, -3);
    // console.log(result.response);
    console.log("Tpe of the response: ", typeof slicedResponse);
    // console.log("Actual response: ", response);

    const jsonResponse = JSON.parse(slicedResponse); // Parse the stringified JSON
    console.log(jsonResponse);
    return jsonResponse; // Return the parsed JSON

    // try {
    // } catch (jsonError) {
    //   throw new Error("Failed to parse the JSON response.");
    // }
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description, posterUrl, content } = req.body;

    // Step 1: Get the author from req.user (injected by middleware)
    const author = req.user._id;

    if (!author) {
      return res.status(401).json({ error: "Unauthorized request!" });
    }

    if (
      [title, description, posterUrl, content].some(
        (field) =>
          field?.trim() === "" ||
          field?.trim() === null ||
          field?.trim() === undefined
      )
    ) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Step 3: Generate metadata using OpenAI
    const { summary, minutesRead, tags } = await generatePostMetadata(
      title,
      description,
      content
    );

    console.log("summary: ", summary);
    console.log("minutesRead: ", minutesRead);
    console.log("tags: ", tags);

    if (!summary || !minutesRead || !tags) {
      // return res.status(400).json({ error: "Missing responses from LLM" });
      console.log(
        "Missing responses from LLM. Saved without summary, minutesRead and tags."
      );
    }

    // if (
    //   [summary, minutesRead, tags].some(
    //     (field) =>
    //       field?.trim() === "" ||
    //       field?.trim() === null ||
    //       field?.trim() === undefined
    //   )
    // ) {
    //   // return res.status(400).json({ error: "Missing responses from LLM" });
    //   console.log("Missing responses from LLM. Saved without summary, minutesRead and tags.");
    // }

    // const responseFromTheLLM = await generatePostMetadata(
    //   title,
    //   description,
    //   content
    // );

    // console.log("Sliced response: ", responseFromTheLLM.slice(7, -3));
    // const jsonResponse = JSON.parse(responseFromTheLLM.slice(7, -3)); // Parse the JSON string
    // console.log("Json sliced and parsed response: ",jsonResponse);
    // const summary = responseFromTheLLM.summary;
    // const minutesRead = responseFromTheLLM.minutesRead;
    // const tags = responseFromTheLLM.tags;

    // Step 2: Save the content in the Content model
    const newContent = new Content({ postContent: content }); // Assuming `text` is the content field
    const savedContent = await newContent.save();
    const contentId = savedContent._id; // Get the generated content ID

    // Step 4: Create the post in the Post model
    const newPost = new Post({
      title,
      description,
      posterUrl,
      content: contentId, // The contentId serves as the reference to the Content document in the Content collection. Mongoose will handle the relationship between the Post and Content models for you.
      author, // As -> author = req.user._id;
      summary,
      minutesRead,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Step 5: Save the post to the database
    await newPost.save();

    // Step 6: Respond to the client
    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({
      message: "Failed to save post",
      error: error.message,
    });
  }
};

const getPost = async (req, res) => {
  // const postId = req.params; -> Wrong!!
  const postId = req.params.postId;
  const userId = req.body?._id;
  console.log("getPost userId: ", userId);

  // or:- const { postId } = req.params;

  if (!postId) {
    return res.status(400).json({ error: "Missing postId" });
  }

  try {
    // Fetch the post from the database

    // Using aggregation directly in place of "populate()"
    // const queriedPost = await Post.findById(postId)
    //   .populate({
    //     path: "content", // Populate the content field
    //     select: "postContent", // Only include 'postContent' field from Content schema
    //   })
    //   .populate({
    //     path: "author", // Populate the author field
    //     select: "name email avatarUrl", // Include only the name and email fields
    //   });

    // Check if the post is liked by this user
    let isLikedByThisUser = false; // Default to false
    if (userId) {
      isLikedByThisUser =
        (await Appreciation.countDocuments({
          appreciatedBy: userId,
          postId: postId,
        })) > 0;
    }

    const queriedPost = await Post.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.postId),
        },
      }, // So we have the post of whose postId is given in the params. Ab iss data mei we have to add in comments and views
      {
        $lookup: {
          from: "appreciations",
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      }, // So, now we have all the Docs of "views DB's" jinmei "postId" jo h wo params mei diye hue id ke barabar hai.
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "commentedBy",
                foreignField: "_id",
                as: "commentedBy",
                pipeline: [
                  {
                    $project: {
                      _id: 1,
                      name: 1,
                      avatarUrl: 1,
                    },
                  },
                ],
              },
            },
          ],
        },
      }, // So, now we have all the Docs of "comment DB's" jinmei "postId" jo h wo params mei diye hue id ke barabar hai.
      // Ok, so ab apne ko return karna hai "likesCount" and "comments ka array"
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author", // Ensure the author field is a single object
      },
      {
        $lookup: {
          from: "contents", // The name of the comments collection
          localField: "content",
          foreignField: "_id",
          as: "content",
        },
      },
      {
        $unwind: "$content", // Ensure the content field is a single object
      },
      {
        $lookup: {
          from: "posts",
          let: { currentAuthor: "$author._id", currentPostId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$author", "$$currentAuthor"] }, // Match same author
                    { $ne: ["$_id", "$$currentPostId"] }, // Exclude the current post
                  ],
                },
              },
            },
            {
              $project: {
                title: 1,
                description: 1,
                posterUrl: 1,
                createdAt: 1,
                minutesRead: 1,
                likesCount: 1,
              },
            },
          ],
          as: "otherPostsByThisPostAuthor",
        },
      },
      {
        $addFields: {
          likesCount: {
            $size: "$likes",
          },
          // comments: "$comment",
        },
      },
      {
        // $project: {
        //   _id: 1,
        //   title: 1,
        //   description: 1,
        //   posterUrl: 1,
        //   content: 1,
        //   author: 1,
        //   summary: 1,
        //   minutesRead: 1,
        //   tags: 1,
        //   likesCount: 1,
        //   comments: 1,
        // },
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          posterUrl: 1,
          content: "$content.postContent", // Include only 'postContent' from content
          author: {
            name: "$author.name",
            email: "$author.email",
            avatarUrl: "$author.avatarUrl",
          },
          summary: 1,
          minutesRead: 1,
          tags: 1,
          likesCount: 1,
          comments: 1,
          otherPostsByThisPostAuthor: 1,
        },
      },
    ]);

    // Check if post exists
    if (!queriedPost || queriedPost.length === 0) {
      return res.status(404).json({ error: "No post found with that postId!" });
    }

    // Return the post if found
    return res.status(200).json({
      message: "Post retrieved successfully!",
      queriedPost: queriedPost[0],
      isLikedByThisUser,
    });
  } catch (err) {
    // Handle any errors during the query process
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the post!" });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.user._id; // Extract the logged-in user's ID from the request object

    // // Find posts where the author matches the logged-in user's ID
    // const posts = await Post.find({ author: userId })
    //   .populate("content", "postContent") // Populate the 'content' field to include postContent
    //   .populate("author", "name email avatarUrl") // Optionally populate author's name and email
    //   .exec();

    // // Respond with the posts
    // return res.status(200).json({
    //   success: true,
    //   data: posts,
    // });

    const posts = await Post.aggregate([
      {
        $match: {
          author: new mongoose.Types.ObjectId(userId),
        },
      },
      // Step 1: Fetch all posts
      {
        $lookup: {
          from: "users", // Populate author field from the users collection
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author", // Unwind the author array (since lookup returns an array)
      },
      {
        $lookup: {
          from: "appreciations", // Lookup likes related to each post
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" }, // Add a new field 'likesCount' with the size of the likes array
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          posterUrl: 1,
          summary: 1,
          minutesRead: 1,
          tags: 1,
          createdAt: 1,
          updatedAt: 1,
          author: { name: 1, email: 1, avatarUrl: 1 }, // Include only the necessary fields from the author
          likesCount: 1, // Include the calculated likesCount
          // Add content if required in the future
        },
      },
    ]);

    // Respond with the aggregated posts
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts by author",
    });
  }
};

// const getAllPosts = async (req, res) => {
//   try {
//     // Fetch all posts from the database
//     const posts = await Post.find()
//     .populate("author", "name email avatarUrl") // Optionally populate author's name and email
//     .exec();

//     // .populate("content", "postContent") // Populate the 'content' field to include postContent -> content not needed as of now.

//     // Respond with all posts
//     return res.status(200).json({
//       success: true,
//       data: posts,
//     });
//   } catch (error) {
//     console.error("Error fetching all posts:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch posts",
//     });
//   }
// };

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      // Step 1: Fetch all posts
      {
        $lookup: {
          from: "users", // Populate author field from the users collection
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: "$author", // Unwind the author array (since lookup returns an array)
      },
      {
        $lookup: {
          from: "appreciations", // Lookup likes related to each post
          localField: "_id",
          foreignField: "postId",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" }, // Add a new field 'likesCount' with the size of the likes array
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          posterUrl: 1,
          summary: 1,
          minutesRead: 1,
          tags: 1,
          createdAt: 1,
          updatedAt: 1,
          author: { name: 1, email: 1, avatarUrl: 1 }, // Include only the necessary fields from the author
          likesCount: 1, // Include the calculated likesCount
          // Add content if required in the future
        },
      },
    ]);

    // Respond with the aggregated posts
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

export { createPost, getPost, getUserPosts, getAllPosts };
