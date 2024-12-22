import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../Loading";

const Followers = () => {
  const { UserId } = useParams();
  const [followers, setFollower] = useState([]);
  const [userData, setUserData] = useState(null);
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
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${UserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from API");
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [UserId]);
  return (
    <div className="flex flex-col items-center gap-5">
      {!userData ? (
        <div className="mt-4">
          <Loading />
        </div>
      ) : (
        followers.map((follower) => {
          return (
            <UserCard
              key={follower.id}
              follower={follower}
              userData={userData}
              setUserData={setUserData}
            />
          );
        })
      )}
    </div>
  );
};

const UserCard = ({ follower, userData, setUserData }) => {
  const isFriend =
    userData.followers.includes(follower.id) &&
    userData.following.includes(follower.id);

  const followBack = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${userData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            following: isFriend
              ? userData.following.filter((id) => id !== follower.id)
              : [...userData.following, follower.id],
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      const updatedUserData = await response.json();
      setUserData(updatedUserData);
      const responseFollower = await fetch(`http://localhost:3000/users/${follower.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followers: isFriend
            ? follower.followers.filter((id) => id !== userData.id)
            : [...follower.followers, userData.id],
        }),
      });
      if (!responseFollower.ok) {
        throw new Error("Failed to update follower data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex items-center justify-between">
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
      <div className="flex gap-2">
        <button
          onClick={isFriend ? null : followBack}
          className={`px-6 py-2 border-2 active:scale-[0.97] rounded-lg ${
            isFriend
              ? "border-green-500 text-green-600"
              : "border-blue-500 text-blue-600"
          }`}
        >
          {isFriend ? "Friend" : "Follow Back"}
        </button>
        {isFriend && (
          <button className="border-2 py-2 px-3 rounded-lg border-blue-500 text-blue-600 active:scale-[0.97]">
            <i className="bx bxs-chat"></i>
          </button>
        )}
      </div>
    </div>
  );
};

export default Followers;
