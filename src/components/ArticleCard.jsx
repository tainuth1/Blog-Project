import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ blog, setShowContentPopUp }) => {
  const { id, title, category, thumbnail, description, userId, created_at } =
    blog;

  const [userInfo, setUserInfo] = useState(null);
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
  const showContentPop = () => {
    setShowContentPopUp(true);
  };
  useEffect(() => {
    const getOwnerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
          throw new Error("Faild to fetch data from api");
        }
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };
    getOwnerData();
  }, [userId]);

  return (
    userInfo && (
      <div className="w-full bg-white shadow-lg p-4 rounded-2xl">
        <div className="w-full h-36 rounded-xl overflow-hidden relative cursor-pointer">
          <img
            className="w-full h-full object-cover transition-all duration-[.3s] hover:scale-[1.05]"
            src={thumbnail}
            alt={category}
          />
          <div className="absolute bottom-2 left-2 rounded-lg px-3 py-1 backdrop-blur-[10px]">
            <p className="text-white text-[10px]">{category}</p>
          </div>
        </div>
        <div className="flex items-center my-2 text-gray-600 gap-2 text-[12px]">
          <i className="bx bx-time text-[14px]"></i>
          <p>{timeAgo(created_at)}</p>
        </div>
        <h3 className="text-gray-800 font-medium line-clamp-2">{title}</h3>
        <p className="text-[14px] line-clamp-2 text-gray-600 my-1">
          {description}
        </p>
        <div className="flex justify-between items-center mb-2 mt-3">
          <div className="flex items-center gap-2">
            <Link to={`/profile/${userId}`}>
              <img
                className="w-9 h-9 object-cover rounded-full"
                src={userInfo.profile}
                alt={userInfo.nickname}
              />
            </Link>
            <div>
              <p className="text-gray-600 text-[13px]">{userInfo.nickname}</p>
              <p className="text-gray-500 text-[12px]">@{userInfo.username}</p>
            </div>
          </div>
          <Link
            to={`/blog/${id}`}
            onClick={showContentPop}
            className="px-7 py-2 bg-blue-500 text-white rounded-lg active:scale-[0.97]"
          >
            View
          </Link>
        </div>
      </div>
    )
  );
};

export default ArticleCard;
