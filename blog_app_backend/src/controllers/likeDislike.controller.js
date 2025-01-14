import { Appreciation } from "../models/appreciation.model.js";

const likeDislikeController = async (req, res) => {
try {
  // When the user hits the like button. This controller checks in the backend if this post has already been liked or not.
  // If it has been liked, then dislike it. Else like it.
  const userId = req.user._id;
  // const {postId} = req.body;
  const postId = req.body.postId;

  if (!postId) {
    return res.status(400).json({
      message: "Post ID is required.",
    });
  }

  //  Check if the user has already liked the post or not!
  //   const existingAppreciation = await Appreciation.findOne({
  //     user: userId,
  //   });

  const existingAppreciation = await Appreciation.findOne({
    appreciatedBy: userId,
    postId,
  });

  // "existingAppreciation" -> if nothing is found, it will be "null" -> Means false.
  if (existingAppreciation) {
    // If present hai toh delete kar do
    const deletedPost = await Appreciation.findByIdAndDelete(
      existingAppreciation._id
    );

    if (deletedPost) {
      return res.status(200).json({
        message: "Post disliked!",
      });
    } else {
      return res.status(500).json({
        message: "Something went wrong while disliking post.",
      });
    }
  } else {
    // If not present hai toh save kar do
    const newAppreciation = new Appreciation({
      appreciatedBy: userId,
      postId,
    });
    await newAppreciation.save();
    return res.status(201).json({
      message: "Post liked!",
    });
  }
} catch (error) {
    console.error("Error in likeDislikeController:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
}
};

export { likeDislikeController };
