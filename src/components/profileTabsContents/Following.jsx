import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Following = () => {
  const { UserId } = useParams();
  const [following, setFollowing] = useState([]);
  useEffect(() => {
    const getFollowingData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${UserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const userData = await response.json();
        const followingPromise = userData.followings.map(async (userId) => {
          const getUser = await fetch(`http://localhost:3000/users/${userId}`);
          if (!getUser.ok) {
            throw new Error("Failed to fetch follower data from API");
          }
          return getUser.json();
        });
        const followingData = await Promise.all(followingPromise);
        setFollowing(followingData);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowingData();
  }, [UserId]);
  return (
    <div className="flex flex-col gap-5">
      {following.map((user) => {
        return <UserCard key={user.id} user={user} />;
      })}
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link
          to={`/profile/${user.id}`}
          className="w-14 h-14 rounded-full overflow-hidden"
        >
          <img
            src={user.profile}
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="">
          <h2 className="text-gray-700 text-lg font-medium">{user.nickname}</h2>
          <p className="text-gray-500 text-sm">{user.username}</p>
        </div>
      </div>
      <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 active:scale-[0.97] rounded-lg">
        Unfollow
      </button>
    </div>
  );
};

export default Following;
