import React from "react";

const ArticleCard = () => {
  return (
    <div className="w-full bg-white shadow-lg p-4 rounded-2xl">
      <div className="w-full h-36 rounded-xl overflow-hidden relative">
        <img
          className="w-full h-full object-cover"
          src="https://scx2.b-cdn.net/gfx/news/hires/2017/3-spacetechnol.jpg"
          alt=""
        />
        <div className="absolute bottom-2 left-2 rounded-lg px-3 py-1 backdrop-blur-[10px]">
          <p className=" text-white text-[10px]">Technology</p>
        </div>
      </div>
      <div className="flex items- my-2 text-gray-600 gap-2 text-[12px]">
        <i className="bx bx-time text-[14px]"></i>
        <p>10 mins ago</p>
      </div>
      <h3 className="text-gray-800 font-medium line-clamp-2">
        Is Emotion Regulation a key to addiction Prevention?
      </h3>
      <p className="text-[14px] line-clamp-2 text-gray-600 my-1">
        Switching to boxicons is easy and can be done in 2 steps. There are more
        features than just the icons set. Boxicons also follows the official
        Google Material Design guidelines
      </p>
      <div className="flex justify-between items-center mb-2 mt-3">
        <div className="flex items-center gap-2">
          <img
            className="w-9 h-9 object-cover rounded-full"
            src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
            alt=""
          />
          <div className="">
            <p className="text-gray-600 text-[13px]">Tai Nuth</p>
            <p className="text-gray-500 text-[12px]">13 Jun 2024</p>
          </div>
        </div>
        <button className="px-7 py-2 bg-blue-500 text-white rounded-lg active:scale-[0.97]">
          View
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
