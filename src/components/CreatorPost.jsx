import React, { useEffect, useState } from "react";

const CreatorPost = ({ ownerPostId }) => {
  const [ownerPostData, setOwnerPostData] = useState([]);
  useEffect(() => {
    const getOwnerPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/posts?userId=${ownerPostId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const ownerPostData = await response.json();
        setOwnerPostData(ownerPostData);
      } catch (error) {
        console.log(error);
      }
    };
    getOwnerPost();
  }, [ownerPostId]);
  return (
    <div className="grid grid-cols-2 gap-2">
      {ownerPostData.map((post) => {
        return (
          <div
            key={post.id}
            className="relative w-full h-44 bg-blue-600 shadow rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-full object-cover transition-all hover:scale-[1.07]"
              src={post.thumbnail}
              alt=""
            />
            <span className="absolute flex items-baseline gap-1 text-sm bottom-2 left-2 z-[1] text-white">
              <i className="bx bxs-heart"></i> {post.likes.length}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default CreatorPost;
