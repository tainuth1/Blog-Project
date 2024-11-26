import React, { useState } from "react";

const CreatePost = () => {
  const [imagePreview, setImagePreview] = useState("");
  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Create Post</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 mt-3">
          <form action="">
            <div className="w-full">
              <label htmlFor="" className="text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                name="title"
                className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
                placeholder="Title"
              />
            </div>
            <div className="w-full mt-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Category
              </label>
              <select
                name="category"
                className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
              >
                <option value="">Technology</option>
                <option value="">News</option>
                <option value="">Jobs</option>
                <option value="">Working</option>
                <option value="">Programming</option>
              </select>
            </div>
            <div className="w-full mt-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Thumbnail
              </label>
              <input
                type="text"
                name="thumbnail"
                value={imagePreview}
                onChange={(e) => setImagePreview(e.target.value)}
                className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
                placeholder="eg. https://example.com/pexels-photo.jpg"
              />
            </div>
            <div className="w-full mt-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Description
              </label>
              <textarea
                name="description"
                className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
                rows={4}
                placeholder="Description"
              ></textarea>
            </div>
            <div className="flex gap-3 justify-end items-center mt-1">
              <button
                type="reset"
                className="px-5 py-2 bg-red-600 text-white rounded-lg active:scale-[0.96]"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-8 py-2 bg-blue-600 text-white rounded-lg active:scale-[0.96]"
              >
                Post
              </button>
            </div>
          </form>
        </div>
        <div className="col-span-1 mt-3">
          <label htmlFor="" className="text-sm text-gray-600">
            Thumbnail Preview
          </label>
          <div className="w-full p-1 aspect-video flex justify-center items-center rounded-lg border-[2px] overflow-hidden">
            {imagePreview ? (
              <img
                className="w-full h-full rounded-md object-cover"
                src={imagePreview}
                alt=""
              />
            ) : (
              <div className="py-4 px-6 text-3xl border-[2px] rounded-lg border-dashed text-gray-500">
                +
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
