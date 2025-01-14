import React from 'react';
import { Heart } from 'lucide-react';

const BlogCard = ({ post, onClick }) => {

  const formatDateTime = (mongodbTimeStamp) => {
    const date = new Date(mongodbTimeStamp);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12

    return `${day}-${month}-${year} | ${hours}:${minutes} ${ampm}`;
  };
  // Output: "31-10-2024 | 4:53 PM"

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-150 cursor-default">
      <img
        src={post.posterUrl}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="flex items-center text-gray-600 text-xs mb-2">
          <img
            src={post.author.avatarUrl}
            alt={post.author.name}
            className="w-6 rounded-full mr-2"
          />
          <span>{post.author.name}</span>
          <span className="mx-2">•</span>
          <span>{formatDateTime(post.createdAt)}</span>
          <span className="mx-2">•</span>
          <span>{post.minutesRead}min read</span>
        </div>
        <div className="flex items-center text-rose-500 text-sm mb-3">
          <span>
            {post.likesCount > 0 ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-red-500 mr-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <Heart className="w-4 h-4 mr-1" />
            )}{" "}
          </span>

          <span>
            {" "}
            {post.likesCount > 1
              ? ` ${post.likesCount} appreciations`
              : ` ${post.likesCount} appreciation`}{" "}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>
        <button
          className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onClick(post._id);
          }}
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;