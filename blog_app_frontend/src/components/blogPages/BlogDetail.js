import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, MessageCircle, Settings } from "lucide-react";
// import { blogPosts } from "./blogData";
import { useSelector } from "react-redux";
import Tooltip from "./Tooltip";
// import useAllPostData from "../utils/useAllPostData";
import usePostDetail from "../utils/usePostDetail";

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postDetail = usePostDetail(id);
  const post = postDetail?.queriedPost;
  // const post = postDetail?.find((post) => post._id === id);
  console.log(post);
  

  // const userData = useSelector((state) => state.auth.userData);
  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const isAdmin = userData?.isAdmin;
  // const isLoggedIn = userData?.isLoggedIn;
  console.log("now" + isLoggedIn);
  

  if (!post) {
    return <p>Post not found!</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <Tooltip message="Admin only" show={!userData?.isAdmin}>
          <button
            className={`text-gray-600 ${
              isAdmin
                ? "cursor-pointer hover:text-gray-900"
                : "cursor-not-allowed"
            }`}
            disabled={!userData?.isAdmin}
          >
            <Settings className="w-6 h-6" />
          </button>
        </Tooltip>
      </div>

      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Cover Image */}
        <div className="lg:col-span-3">
          <img
            src={post.posterUrl}
            alt={post.title}
            className="w-full rounded-lg shadow-lg"
          />
          {/* Interaction Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            <Tooltip message="Login first" show={!isLoggedIn}>
              <button
                className={`flex items-center space-x-2 text-rose-500 ${
                  isLoggedIn
                    ? "cursor-pointer hover:text-rose-700"
                    : "cursor-not-allowed text-rose-300"
                }`}
              >
                <Heart className="w-6 h-6" />
                <span>{post?.appreciationCount}</span>
              </button>
            </Tooltip>
            <Tooltip message="Login first" show={!isLoggedIn}>
              <button
                className={`flex items-center space-x-2 text-gray-500 ${
                  isLoggedIn
                    ? "cursor-pointer hover:text-gray-700"
                    : "cursor-not-allowed text-gray-300"
                }`}
              >
                <MessageCircle className="w-6 h-6" />
                <span>{post?.comments?.length}</span>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Summary and Content */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <p className="text-gray-600">{post.summary}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Content</h2>
            <p>{post?.content?.postContent}</p>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {/* <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>
        {post.comments.length > 0 ? (
          <div className="space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="font-medium">{comment.author}</span>
                  <span className="mx-2">•</span>
                  <span className="text-gray-600 text-sm">{comment.date}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div> */}
    </div>
  );
};

export default BlogDetail;
