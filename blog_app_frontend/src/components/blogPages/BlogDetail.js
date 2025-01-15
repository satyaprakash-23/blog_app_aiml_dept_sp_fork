import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, MessageCircle, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import Tooltip from "./Tooltip";
import usePostDetail from "../utils/usePostDetail";
import Modal from "./Modal";
import CommentEditor from "./CommentEditor";
import formatDateTime from "../utils/formatDateTime";

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const postDetail = usePostDetail(id);
  const post = postDetail?.queriedPost;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const { isLoggedIn, userData } = useSelector((state) => state.auth);
  const isAdmin = userData?.isAdmin;
  console.log("Is logged in: " + isLoggedIn);

  const [isPostLikedByThisUser, setIsPostLikedByThisUser] = useState(null);
  const [likes, setLikes] = useState(null);

  useEffect(() => {
    setLikes(post?.likesCount);
    setIsPostLikedByThisUser(postDetail?.isLikedByThisUser);
  }, [post, postDetail]);

  const handleLikeButtonClick = async (postId) => {
    async function likeDislikeApi() {
      const response = await fetch(
        "http://localhost:4800/api/v1/appreciation/likeDislike",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            postId,
          }),
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.message === "Post liked!") {
        console.log("likeDislike Button message: ", jsonResponse.message);
        setLikes((prev) => prev + 1);
        setIsPostLikedByThisUser((prev) => !prev);
      } else {
        console.log("likeDislike Button message: ", jsonResponse.message);
        setLikes((prev) => prev - 1);
        setIsPostLikedByThisUser((prev) => !prev);
      }
    }
    likeDislikeApi();
  };

  if (!post) {
    return <p>Post not found!</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 sm:mb-6 lg:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-gray-900"
        >
          ← Back
        </button>
        <Tooltip message="Admin only" show={!userData?.isAdmin}>
          <button
            className={`text-gray-600 ${
              userData?.isAdmin
                ? "cursor-pointer hover:text-gray-900"
                : "cursor-not-allowed"
            }`}
            disabled={!userData?.isAdmin}
          >
            <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </Tooltip>
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">
        {post?.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {/* Cover Image and Interactions */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
            <img
              src={post?.posterUrl}
              alt={post?.title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          {/* Interaction Buttons */}
          <div className="flex items-center space-x-4 mt-2 sm:mt-4">
            <Tooltip message="Login first" show={!isLoggedIn}>
              <button
                className={`flex items-center space-x-2 text-rose-500 ${
                  isLoggedIn
                    ? "cursor-pointer hover:text-rose-700"
                    : "cursor-not-allowed text-rose-300"
                }`}
                onClick={() => handleLikeButtonClick(post?._id)}
                disabled={!isLoggedIn}
              >
                {isPostLikedByThisUser ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 sm:w-6 sm:h-6 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
                <span className="text-sm sm:text-base">{likes}</span>
              </button>
            </Tooltip>
            <Tooltip message="Login first" show={!isLoggedIn}>
              <button
                className={`flex items-center space-x-2 text-gray-500 ${
                  isLoggedIn
                    ? "cursor-pointer hover:text-gray-700"
                    : "cursor-not-allowed text-gray-300"
                }`}
                disabled={!isLoggedIn}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">{post?.comments?.length}</span>
              </button>
            </Tooltip>
          </div>
        </div>

        {/* Summary and Content */}
        <div className="lg:col-span-2 flex flex-col justify-between space-y-4 sm:space-y-6">
          <div className="flex flex-col justify-between align-baseline space-y-4">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
              <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Summary</h2>
              <p className="text-gray-600 text-sm sm:text-base">{post?.summary}</p>
            </div>
            <div className="w-full">
              <button
                type="button"
                className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-4 sm:px-5 py-2 sm:py-2.5 text-center inline-flex items-center justify-center"
                onClick={handleOpenModal}
              >
                Read Full Blog Content Here
              </button>
              <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                content={post.content}
                title={post.title}
              />
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="lg:col-span-3 mt-6 lg:mt-0">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Comments</h2>
          <CommentEditor />
          {post.comments.length > 0 ? (
            <div className="space-y-3 sm:space-y-4 mt-3">
              {post.comments.map((comment) => (
                <div key={comment._id} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-medium text-sm sm:text-base">
                      {comment.commentedBy}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {formatDateTime(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{comment.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-sm sm:text-base mt-3">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;