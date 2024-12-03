import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "./Loading";
const EditForm = () => {
  const { setShowEditForm, setAlert, setRelaodData } = useOutletContext();
  const [imagePreview, setImagePreview] = useState("");
  const { EditId } = useParams();
  const [formValue, setFormvalue] = useState({});
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const updatePosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/${EditId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      if (!response.ok) {
        throw new Error("Failed to update post.");
      }

      const data = await response.json();
      setAlert({ message: "Uppdate Successfully", type: "success" });
      setShowEditForm(false);
      setRelaodData(true);
    } catch (error) {
      setShowEditForm(false);
      setAlert({ message: "Update False", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/${EditId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from api for update.");
        }

        const data = await response.json();
        setFormvalue(data);
        setImagePreview(data.thumbnail);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [EditId]);

  const closeEditForm = () => {
    setShowEditForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalue({ ...formValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate(formValue);
    setFormError(error);
    if (Object.keys(error).length === 0) {
      updatePosts();
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

  const borderRed = { borderColor: "#dc2626" };
  return (
    <motion.div
      initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
      transition={{ duration: 0.1 }}
      className="fixed transition-all inset-0 flex justify-center items-center bg-black z-10"
    >
      <div onClick={closeEditForm} className="absolute w-full h-full"></div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.15 }}
        className="z-20"
      >
        <div className="w-[1100px] bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          {loading && (
            <div className="absolute top-6 left-[500px]">
              <Loading />
            </div>
          )}
          <div className="w-full px-3 py-1 border-b-[1px] bg-slate-200">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full bg-[#FF5F56] cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#FFBD2E] cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#27c93f] cursor-pointer"></div>
              </div>
              <button
                onClick={closeEditForm}
                className="w-10 h-10 transition-all flex justify-center items-center rounded-full text-gray-600 hover:text-gray-700 active:scale-[0.95] hover:bg-gray-100"
              >
                <i className="bx bx-x text-3xl "></i>
              </button>
            </div>
          </div>
          <div className="p-5">
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
                      value={formValue.category}
                      onChange={handleChange}
                      style={formError.category && borderRed}
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
                      value={formValue.thumbnail}
                      onChange={(e) => {
                        setImagePreview(e.target.value);
                        handleChange(e);
                      }}
                      style={formError.thumbnail && borderRed}
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
                      value={formValue.description}
                      onChange={handleChange}
                      style={formError.description && borderRed}
                      className="border w-full px-5 py-3 rounded-lg focus:outline-blue-600 text-gray-700"
                      rows={4}
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div className="flex gap-3 justify-end items-center mt-1">
                    <button
                      type="reset"
                      onClick={closeEditForm}
                      className="px-5 py-2 bg-red-600 text-white rounded-lg active:scale-[0.96]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2 bg-blue-600 text-white rounded-lg active:scale-[0.96]"
                    >
                      Update
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditForm;
