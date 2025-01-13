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
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-150 cursor-default"
    >
      <img 
        src={post.posterUrl} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <img 
            src={post.author.avatarUrl} 
            alt={post.author.name}
            className="w-6 rounded-full mr-2"
          />
          <span>{post.author.name}</span>
          <span className="mx-2">•</span>
          <span>{formatDateTime(post.createdAt)}</span>
          <span className="mx-2">•</span>
          <span>{post.minutesRead}min</span>
        </div>
        <div className="flex items-center text-rose-500 text-sm mb-3">
          <Heart className="w-4 h-4 mr-1" />
          <span>{post.appreciationCount} appreciations</span>
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