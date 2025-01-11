import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    postContent: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
// the ref: "Post", should be the same as "Post" as given in string of Post model. kust like the string in model("Name", nameSchema)
export { Content };
