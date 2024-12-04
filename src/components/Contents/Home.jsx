import React, { useEffect, useState } from "react";
import ArticleCard from "../ArticleCard";
import { AnimatePresence, motion } from "motion/react";
import { Outlet, useSearchParams } from "react-router-dom";
import Loading from "../Loading";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [showContentPopUp, setShowContentPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useSearchParams({ category: "All" });
  const getCate = filter.get("category");

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      if (getCate == "All") {
        try {
          const responce = await fetch("http://localhost:3000/posts");
          if (!responce.ok) {
            throw new Error("Fail to fetch data from api");
          }

          const data = await responce.json();
          setBlogs(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      } else {
        try {
          const responce = await fetch(
            `http://localhost:3000/posts?category=${getCate}`
          );
          if (!responce.ok) {
            throw new Error("Fail to fetch data from api");
          }

          const data = await responce.json();
          setBlogs(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    getBlog();
  }, [getCate]);
  if (!showContentPopUp) {
    window.history.pushState({}, "", "/");
  }

  return (
    <div>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          window.history.pushState({}, "", "/");
        }}
      >
        {showContentPopUp && <Outlet context={{ setShowContentPopUp }} />}
      </AnimatePresence>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Article</h1>
          <span className="px-3 py-[2px] rounded-full bg-gray-100 border text-sm">
            {blogs.length}
          </span>
        </div>
        <div className=" flex gap-3">
          <select
            value={getCate}
            onChange={(e) => setFilter({ category: e.target.value })}
            className="w-40 px-3 py-2 focus:outline-blue-600 text-gray-700 rounded-full shadow-inner bg-gray-100 border"
          >
            <option value="All">All</option>
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
          <button className="">
            <i className="bx bxs-filter-alt text-gray-700 p-3 border bg-[#E5ECFF] rounded-full shadow-inner"></i>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {loading && (
          <div className="flex col-span-4 justify-center">
            <Loading />
          </div>
        )}
        {blogs.map((blog) => {
          return (
            <ArticleCard
              key={blog.id}
              blog={blog}
              setShowContentPopUp={setShowContentPopUp}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
