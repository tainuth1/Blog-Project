import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { AnimatePresence } from "motion/react";
import SuccessAlert from "../SuccessAlert";
import FailAlert from "../FailAlert";
import { Link, Outlet } from "react-router-dom";

const MyPost = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowPerpage = 7;
  const [totalPages, setTotalPages] = useState(0);
  const [showEditForm, setShowEditForm] = useState(false);
  const [reloadData, setRelaodData] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const allPostsRepsonse = await fetch("http://localhost:3000/posts");
        const allPosts = await allPostsRepsonse.json();
        setTotalPages(Math.ceil(allPosts.length / rowPerpage));

        const response = await fetch(
          `http://localhost:3000/posts?_page=${currentPage}&_per_page=${rowPerpage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const paginatedData = await response.json();
        setRelaodData(false);
        setBlogs(paginatedData.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentPage, reloadData]);

  const deletePost = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data from api");
      }
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      setAlert({ message: "Delete successfully", type: "success" });
    } catch (error) {
      setAlert({ message: "Delete Failed", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  const closeAlert = () => {
    setAlert({ message: "", type: "" });
    alert();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const timeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const seconds = Math.floor((now - date) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }
    return "Just now";
  };

  if (!showEditForm) {
    window.history.pushState({}, "", "/my-post");
  }

  return (                                            
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">My Post</h1>
        </div>
      </div>
      {loading && (
        <div className="fixed top-5 left-[750px]">
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
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.history.pushState({}, "", "/");
        }}
      >
        {showEditForm && (
          <Outlet context={{ setShowEditForm, setAlert, setRelaodData }} />
        )}
      </AnimatePresence>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full text-left bg-white overflow-hidden rounded-lg dark:bg-gray-800">
          <thead>
            <tr className="border-b-[1px] border-gray-200 dark:border-gray-400 bg-gray-100 dark:bg-gray-700">
              <th className="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                #
              </th>
              <th className="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Title
              </th>
              <th className="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Category
              </th>
              <th className="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Discription
              </th>
              <th className="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Thumbnail
              </th>
              <th className="px-6 py-4 text-[14px] text-gray-700 font-semibold dark:text-gray-300">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {blogs.map((blog) => {
              return (
                <tr
                  key={blog.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-3 text-[14px] dark:text-gray-200">
                    #{blog.id}
                  </td>
                  <td className="px-6 py-3">
                    <span className="w-[150px] text-[14px] inline-block whitespace-nowrap overflow-hidden text-ellipsis font-medium dark:text-gray-200">
                      {blog.title}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                    {blog.category}
                  </td>
                  <td className="px-6 py-3">
                    <span className="w-[250px] text-[14px] inline-block whitespace-nowrap overflow-hidden text-gray-600 text-ellipsis dark:text-gray-200">
                      {blog.description}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                    {/* <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                      Active
                    </span> */}
                    {timeAgo(blog.created_at)}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    <Link
                      to={`edit/${blog.id}`}
                      onClick={() => setShowEditForm(true)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md active:scale-[0.97]"
                    >
                      <i className="bx bxs-edit"></i>
                    </Link>
                    <button
                      onClick={() => deletePost(blog.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md active:scale-[0.97]"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPost;
