import React from 'react';
import { Heart } from 'lucide-react';

const BlogCard = ({ post, onClick }) => {
  return (
    
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onClick(post.id)}
    >
      <img 
        src={post.coverImage} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-6 h-6 rounded-full mr-2"
          />
          <span>{post.author.name}</span>
          <span className="mx-2">•</span>
          <span>{post.datePosted}</span>
          <span className="mx-2">•</span>
          <span>{post.readingTime}</span>
        </div>
        <div className="flex items-center text-rose-500 text-sm mb-3">
          <Heart className="w-4 h-4 mr-1" />
          <span>{post.appreciationCount} appreciations</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{post.summary}</p>
        <button 
          className="text-blue-600 hover:text-blue-800 font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onClick(post.id);
          }}
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;