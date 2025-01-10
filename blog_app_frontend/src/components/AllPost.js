import React from "react";
import { blogPosts } from "./blogData";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";

const AllPost = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">All Posts</h1>
        
        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={(id) => navigate(`/all-posts/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default AllPost;
