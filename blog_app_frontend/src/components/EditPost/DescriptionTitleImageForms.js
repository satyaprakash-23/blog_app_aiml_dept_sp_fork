import React, { useState } from "react";

const DescriptionTitleImageForms = ({
  setTitle,
  setDescription,
  setImage,
  publishBlog,
  prevDescription,
  prevTitle,
  prevPosterUrl,
  image,
  checked,
  setChecked,
}) => {
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleCheck = (field) => {
    setChecked({ ...checked, [field]: !checked[field] });
  };

  return (
    <div className="w-[30vw] max-h-[80vh] min-h-[80vh] overflow-y-auto mx-auto bg-white shadow-md rounded-xl p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Make changes you want
      </h1>
      <form className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Edit Title
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
            Edit Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={prevDescription}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a brief description of your blog"
            className="mt-1 p-3 h-[20vh] min-h-[20vh] max-h-[20vh] block w-full rounded-md border-gray-300 shadow-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        {image ? null : (
          <div className=" h-fit w-fit">
            <label className=" text-sm font-medium text-gray-700 mb-2">
              Previous Poster
            </label>
            <img className="rounded-lg" src={prevPosterUrl} alt="prevPoster" />
          </div>
        )}

        {/* Image Selector */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 "
          >
            Select new Image
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

        <div className="space-y-3 border-2 border-solid p-2 rounded-lg">
          <label className="text-sm font-medium text-gray-700 ">
            <p>
              Select what you modified. Only selected fields will be edited in
              the backend.
            </p>
          </label>
          <div>
            {["description", "title", "content", "image"].map((item) => (
              <label key={item} className="flex items-center space-x-3 ">
                <input
                  type="checkbox"
                  className="w-3 h-3 text-indigo-500 cursor-pointer"
                  checked={checked[item]}
                  onChange={() => handleCheck(item)}
                />
                <span className="text-gray-700 text-sm capitalize">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}

        <div className="flex justify-end w-full ">
          <button
            type="submit"
            onClick={(e) => publishBlog(e)}
            disabled={Object.values(checked).every((value) => value === false)} // Agar saare false hain then true return karo
            className={`bg-indigo-600 text-white w-full py-2 px-4 rounded-md shadow ${
              Object.values(checked).every((value) => value === false)
                ? " opacity-30 cursor-not-allowed"
                : "hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 "
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default DescriptionTitleImageForms;
