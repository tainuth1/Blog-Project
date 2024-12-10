import React, { useEffect, useState } from "react";

const Comment = ({ comments, showBlog }) => {
  const [userData, setUserData] = useState();
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
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${comments.userId}`
        );
        if (!response.ok) {
          throw new Error("failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);
  return (
    userData && (
      <div className="">
        <div className="flex gap-1">
          <div className="">
            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
              <img
                className="w-full h-full object-cover"
                src={userData.profile}
                alt=""
              />
            </div>
          </div>
          <div className="">
            <h2 className="text-[12px] transition-all text-gray-800 hover:underline cursor-pointer">
              {userData.nickname}{" "}
              {showBlog.userId == comments.userId ? (
                <span className="text-red-600 ml-2 font-semibold">Creator</span>
              ) : (
                " "
              )}
            </h2>
            <p className="text-[13.5px] text-[#242424]">{comments.content}</p>
            <span className="text-[12px]">{timeAgo(comments.created_at)}</span>
          </div>
        </div>
      </div>
    )
  );
};

export default Comment;
