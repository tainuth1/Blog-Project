import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Loading from "../Loading";
import SuccessAlert from "../SuccessAlert";
import FailAlert from "../FailAlert";
import { useAuth } from "../auth/AuthProvider";

const CreatePost = () => {
  const { user } = useAuth();
  const initialize = {
    id: `${Date.now()}`,
    title: "",
    category: "",
    description: "",
    thumbnail: "",
    userId: `${user.id}`,
    likes: [],
    favorites: [],
    created_at: new Date().toISOString(),
  };
  const [imagePreview, setImagePreview] = useState("");
  const [formValue, setFormvalues] = useState(initialize);
  const [formError, setFormError] = useState({});
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const createPost = async () => {
    setLoading(true);
    try {
      const responce = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (!responce.ok) {
        throw new Error("Failed to POST data.");
      }

      setAlert({ message: "Successfully Posted", type: "success" });
      setFormvalues(initialize);
      setImagePreview("");
    } catch (error) {
      setAlert({ message: "Posting Blog failse.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formValue, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate(formValue);
    setFormError(error);
    if (Object.keys(error).length === 0) {
      createPost();
    }
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
    } else if (values.description.length < 30) {
      errors.description = "Desciption is too short.";
    } else if (values.description.length > 500) {
      errors.description = "Desciption is too Long.";
    }
    return errors;
  };
  const cancelPost = () => {
    setImagePreview("");
    setFormvalues(initialize);
    setFormError({});
  };
  const closeAlert = () => {
    setAlert({ message: "", type: "" });
    alert();
  };

  const borderRed = { borderColor: "#dc2626" };
  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Create Post</h1>
        </div>
      </div>
      {loading && (
        <div className="fixed top-[92px] left-[450px]">
          <Loading />
        </div>
      )}
      <AnimatePresence>
        {alert.message && (
          <div>
            {alert.type === "success" ? (
              <div className="fixed top-8 left-[600px]">
                <SuccessAlert message={alert.message} closeAlert={closeAlert} />
              </div>
            ) : (
              <div className="fixed top-8 left-[600px]">
                <FailAlert message={alert.message} closeAlert={closeAlert} />
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 mt-3">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="" className="text-sm text-gray-600">
                Title
              </label>
              {formError.title && (
                <span className="ml-5 text-red-600 text-[11px]">
                  {formError.title}
                </span>
              )}
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
              {formError.category && (
                <span className="ml-5 text-red-600 text-[11px]">
                  {formError.category}
                </span>
              )}
              <select
                name="category"
                style={formError.category && borderRed}
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
              {formError.thumbnail && (
                <span className="ml-5 text-red-600 text-[11px]">
                  {formError.thumbnail}
                </span>
              )}
              <input
                type="text"
                name="thumbnail"
                autoComplete="off"
                style={formError.thumbnail && borderRed}
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
              {formError.description && (
                <span className="ml-5 text-red-600 text-[11px]">
                  {formError.description}
                </span>
              )}
              <textarea
                name="description"
                style={formError.description && borderRed}
                value={formValue.description}
                onChange={handleChange}
                className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
                rows={4}
                placeholder="Description"
              ></textarea>
            </div>
            <div className="flex gap-3 justify-end items-center mt-1">
              <button
                onClick={cancelPost}
                type="reset"
                className="px-5 py-2 bg-red-600 text-white rounded-lg active:scale-[0.96]"
              >
                Cancel
              </button>
              <button
                type="submit"
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
