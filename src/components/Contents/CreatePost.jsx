import React, { useEffect, useState } from "react";

const CreatePost = () => {
  const initailize = {
    id: Date.now(),
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    userId: 1,
    created_at: new Date().toISOString(),
  };
  const [imagePreview, setImagePreview] = useState("");
  const [formValue, setFormvalues] = useState(initailize);
  const [formError, setFormError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(formValue));
    setFormvalues(initailize);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required.";
    } else if (values.title.length < 10) {
      errors.title = "Title is too short.";
    } else if (values.title.length > 100) {
      errors.title = "Title is too Long.";
    }
    if (!values.category) {
      errors.category = "Category is required.";
    }
    if (!values.thumbnail) {
      errors.thumbnail = "Thumbnail is required.";
    } else if (values.thumbnail && !imagePreview) {
      errors.thumbnail = "Thumbnail not working";
    }
    if (!values.description) {
      errors.description = "Desciption is required.";
    } else if (values.description.length < 20) {
      errors.description = "Desciption is too short.";
    } else if (values.description.length > 400) {
      errors.description = "Desciption is too Long.";
    }
    return errors;
  };

  const borderRed = { borderColor: "#dc2626" };
  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Create Post</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 mt-3">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="" className="text-sm text-gray-600">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formValue.title}
                onChange={handleChange}
                style={formError.title && borderRed}
                className={
                  "border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700 "
                }
                placeholder="Title"
              />
            </div>
            <div className="w-full mt-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Category
              </label>
              <select
                name="category"
                style={formError.title && borderRed}
                value={formValue.category}
                onChange={handleChange}
                className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
              >
                <option>Choose Category</option>
                <option value="Technology">Technology</option>
                <option value="News">News</option>
                <option value="Jobs">Jobs</option>
                <option value="Working">Working</option>
                <option value="Programming">Programming</option>
                <option value="Meme">Meme</option>
                <option value="Social">Social</option>
                <option value="Gaming">Gaming</option>
                <option value="Turnament">Turnament</option>
                <option value="International">International</option>
              </select>
            </div>
            <div className="w-full mt-3">
              <label htmlFor="" className="text-sm text-gray-600">
                Thumbnail
              </label>
              <input
                type="text"
                name="thumbnail"
                style={formError.title && borderRed}
                value={formValue.thumbnail}
                onChange={(e) => {
                  handleChange(e);
                  setImagePreview(e.target.value);
                }}
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
                style={formError.title && borderRed}
                value={formValue.description}
                onChange={handleChange}
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
                type="submit"
                onClick={() => console.log(formValue)}
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
