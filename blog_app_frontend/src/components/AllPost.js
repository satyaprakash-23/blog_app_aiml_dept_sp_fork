import React from "react";
import BlogCard from "./blogPages/BlogCard";
import { useNavigate } from "react-router-dom";
import useAllPostData from "./utils/useAllPostData";
import CardsGridDesign from "./utils/CardsGridDesign";

const AllPost = () => {
  
  // const allPostData = useAllPostData();
  // const allPostData = useAllPostData();
  // <CardsGridDesign data={allPostData} />;
  
  
  // const navigate = useNavigate();
  const allPostData = useAllPostData();
  
  // console.log("hi"  + allPostData);
  
  return (
    <>
    <CardsGridDesign data={allPostData} />
    </>
    // <>
    // <CardsGridDesign data={allPostData} />
    // <div className="min-h-screen bg-gray-100 py-12 rounded-md">
    //   <div className="max-w-7xl mx-auto px-4">
    //     <h1 className="text-3xl font-bold mb-8">All Posts</h1>

    //     {/* Masonry Grid */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //       {allPostData?.map((post) => (
    //         <BlogCard
    //           key={post._id}
    //           post={post}
    //           // onClick={(id) => navigate(`/all-posts/${id}`)}
    //         />
    //       ))}
    //     </div>
    //   </div>
    // </div>
    // </>
  );
};

export default AllPost;
