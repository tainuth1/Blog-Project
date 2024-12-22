import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Loading from "../Loading";

const Following = () => {
  const { UserId } = useParams();
  const { user } = useAuth();
  const [following, setFollowing] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${UserId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const userData = await response.json();

        const followingPromise = userData.following.map(async (userId) => {
          const userResponse = await fetch(
            `http://localhost:3000/users/${userId}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch following user data.");
          }
          return userResponse.json();
        });

        const followingData = await Promise.all(followingPromise);

        setFollowing(followingData);
        setCurrentUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [UserId]);

  const updateFollowingState = (targetUserId, isFollowing) => {
    setCurrentUser((prev) => ({
      ...prev,
      following: isFollowing
        ? prev.following.filter((id) => id !== targetUserId)
        : [...prev.following, targetUserId],
    }));
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {!currentUser ? (
        <div className="mt-4">
          <Loading />
        </div>
      ) : null}
      {following.map((userData) => (
        <UserCard
          key={user.id}
          userData={userData}
          user={user}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          updateFollowingState={updateFollowingState}
        />
      ))}
    </div>
  );
};

const UserCard = ({ userData, currentUser, updateFollowingState, user }) => {
  const handleFollowButton = async () => {
    const isFollowing = currentUser.following.includes(userData.id);

    try {
      const updatedFollowing = isFollowing
        ? currentUser.following.filter((id) => id !== userData.id)
        : [...currentUser.following, userData.id];

      const updatedFollowers = isFollowing
        ? userData.followers.filter((id) => id !== currentUser.id)
        : userData.followers.includes(currentUser.id)
        ? userData.followers
        : [...userData.followers, currentUser.id];

      await fetch(`http://localhost:3000/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ following: updatedFollowing }),
      });

      await fetch(`http://localhost:3000/users/${userData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followers: updatedFollowers }),
      });

      updateFollowingState(userData.id, isFollowing);
    } catch (error) {
      console.error("Error updating follow/unfollow:", error);
    }
  };

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link
          to={`/profile/${userData.id}`}
          className="w-14 h-14 rounded-full overflow-hidden"
        >
          <img
            src={userData.profile}
            alt={userData.nickname}
            className="w-full h-full object-cover"
          />
        </Link>
        <div>
          <h2 className="text-gray-700 text-lg font-medium">
            {userData.nickname}
          </h2>
          <p className="text-gray-500 text-sm">{userData.username}</p>
        </div>
      </div>
      {currentUser.id === user.id && (
        <button
          onClick={handleFollowButton}
          className={`px-6 py-2 border-2 ${
            currentUser.following.includes(userData.id)
              ? "border-red-500 text-red-600"
              : "border-green-500 text-green-600"
          } active:scale-[0.97] rounded-lg`}
        >
          {currentUser.following.includes(userData.id) ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default Following;
