import React, { useEffect, useState } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";

const Likes = () => {
  const { UserId } = useParams();
  const [likes, setLike] = useState([]);
  useEffect(() => {
    const getLikePosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from api.");
        }
        const posts = await response.json();
        const likePosts = posts.filter((post) => post.likes.includes(UserId));
        // setLike(likePosts);
        // console.log(likePosts);
        setLike(likePosts);
      } catch (error) {
        console.log(error);
      }
    };
    getLikePosts();
  }, []);
  return (
    <div className="w-full grid grid-cols-4 gap-2">
      {likes.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </div>
  );
};

const PostCard = ({post}) => {
  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden cursor-pointer">
      <img
        src={post.thumbnail}
        alt=""
        className="w-full h-full object-cover transition-all hover:scale-[1.07]"
      />
      <span className="absolute flex items-baseline gap-1 text-sm bottom-2 left-2 z-[1] text-white">
        <i className="bx bxs-heart"></i> {post.likes.length}
      </span>
    </div>
  );
};

export default Likes;
