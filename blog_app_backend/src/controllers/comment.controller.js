import { Comment } from "../models/comment.model.js";

const addComment = async (req, res) => {
  try {
    const { postId, comment } = req.body; // Extract postId and comment from the request body
    const userId = req.user._id; // Assume the user is authenticated and their ID is available in `req.user`

    // Check if both postId and comment are provided
    if (!postId || !comment) {
      return res.status(400).json({
        message: "Post ID and comment are required.",
      });
    }

    // Create a new comment
    const newComment = new Comment({
      postId,
      commentedBy: userId,
      comment,
    });

    // Save the comment to the database
    const savedComment = await newComment.save();

    // Return a success response
    return res.status(201).json({
      message: "Comment added successfully.",
      comment: savedComment,
    });
  } catch (error) {
    console.error("Error in addComment controller:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params; // Extract postId from the request parameters

    // Check if postId is provided
    if (!postId) {
      return res.status(400).json({
        message: "Post ID is required.",
      });
    }

    // Find all comments for the given postId
    const comments = await Comment.find({ postId }).populate(
      "commentedBy",
      "_id name avatarUrl"
    );

    // Return the comments
    return res.status(200).json({
      message: "Comments retrieved successfully.",
      comments,
    });
  } catch (error) {
    console.error("Error in getPostComments controller:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export { addComment, getPostComments };
