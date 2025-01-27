import React from "react";

const DescriptionTitleImageForms = ({
  setTitle,
  setDescription,
  setImage,
  publishBlog,
  prevDescription,
  prevTitle,
}) => {
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="w-[30vw] h-full mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Create a New Blog Post
      </h1>
      <form className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={prevTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title"
            className="mt-1 p-3 block w-full rounded-md border-gray-400 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={prevDescription}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief description of your blog"
            className="mt-1 p-3 h-[30vh] min-h-[30vh] max-h-[30vh] block w-full rounded-md border-gray-300 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {/* Image Selector */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 "
          >
            Select an Image
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 border-2 rounded-lg
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-100 file:text-indigo-700
                        hover:file:bg-indigo-200"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end w-full ">
          <button
            type="submit"
            onClick={(e) => publishBlog(e)}
            className="bg-indigo-600 text-white w-full py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default DescriptionTitleImageForms;
