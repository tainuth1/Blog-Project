import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Followers = () => {
  const { UserId } = useParams();
  const [followers, setFollower] = useState([]);
  useEffect(() => {
    const getFollowerData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${UserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const userData = await response.json();
        const followerPromise = userData.followers.map(async (userId) => {
          const getUser = await fetch(`http://localhost:3000/users/${userId}`);
          if (!getUser.ok) {
            throw new Error("Failed to fetch follower data from API");
          }
          return getUser.json();
        });
        const followerData = await Promise.all(followerPromise);
        setFollower(followerData);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowerData();
  }, [UserId]);
  return (
    <div className="flex flex-col gap-5">
      {followers.map((follower) => {
        return <UserCard key={follower.id} follower={follower} />;
      })}
    </div>
  );
};

const UserCard = ({ follower }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link
          to={`/profile/${follower.id}`}
          className="w-14 h-14 rounded-full overflow-hidden"
        >
          <img
            src={follower.profile}
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="">
          <h2 className="text-gray-700 text-lg font-medium">
            {follower.nickname}
          </h2>
          <p className="text-gray-500 text-sm">{follower.username}</p>
        </div>
      </div>
      <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 active:scale-[0.97] rounded-lg">
        Friend
      </button>
    </div>
  );
};

export default Followers;
