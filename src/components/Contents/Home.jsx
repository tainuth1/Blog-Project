import React from "react";
import ArticleCard from "../ArticleCard";

const Home = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Article</h1>
          <span className="px-3 py-[2px] rounded-full bg-gray-100 border text-sm">
            120
          </span>
        </div>
        <div className=" flex gap-3">
          <select className="w-40 px-3 py-2 focus:outline-blue-600 text-gray-700 rounded-full shadow-inner bg-gray-100 border">
            <option value="">Technology</option>
            <option value="">News</option>
            <option value="">Jobs</option>
            <option value="">Working</option>
            <option value="">Programming</option>
          </select>
          <button className="">
            <i class="bx bxs-filter-alt text-gray-700 p-3 border bg-[#E5ECFF] rounded-full shadow-inner"></i>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5 mt-5">
        {[1, 1, 1, 1, 1].map(() => {
          return <ArticleCard />;
        })}
      </div>
    </div>
  );
};

export default Home;
