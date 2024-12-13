import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { AnimatePresence } from "motion/react";

const Profile = () => {
  const { UserId } = useParams();
  const [userData, setUserData] = useState(null);
  const [topPost, setTopPost] = useState([]);
  const [showEditProfile, setShowEditProfile] = useState(false);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const responseUser = await fetch(
          `http://localhost:3000/users/${UserId}`
        );
        if (!responseUser.ok) {
          throw new Error("Failed to fetch data from api");
        }

        const dataUser = await responseUser.json();
        setUserData(dataUser);
        const responsePost = await fetch(
          `http://localhost:3000/posts?userId=${dataUser.id}&_limit=5`
        );
        if (!responsePost.ok) {
          throw new Error("failed to fetch posts from api");
        }
        const dataPost = await responsePost.json();
        setTopPost(dataPost);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [UserId]);
  if (!showEditProfile) {
    window.history.pushState({}, "", `/profile/${UserId}`);
  }
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Profile</h1>
        </div>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            window.history.pushState({}, "", `/profile/${UserId}`);
          }}
        >
          {showEditProfile && (
            <Outlet context={{ UserId, setShowEditProfile }} />
          )}
        </AnimatePresence>
      </div>
      {userData && (
        <ProfileComponent
          userData={userData}
          topPost={topPost}
          UserId={UserId}
          setShowEditProfile={setShowEditProfile}
        />
      )}
    </div>
  );
};

const ProfileComponent = ({
  userData,
  topPost,
  UserId,
  setShowEditProfile,
}) => {
  const handleFormShow = () => {
    setShowEditProfile(true);
  };
  return (
    <div className="grid grid-cols-3 mt-4 gap-4">
      <div className="col-span-1">
        <div className="w-full bg-white shadow-xl border rounded-xl p-4">
          <div className="w-40 h-40 rounded-full shadow m-auto relative">
            <img
              className="w-full h-full rounded-full object-cover"
              src={userData.profile}
              alt=""
            />
            <button className="absolute top-2 right-2 bg-white shadow-2xl border w-8 h-8 flex justify-center items-center rounded-full text-gray-600">
              <i className="bx bxs-pencil"></i>
            </button>
          </div>
          <h2 className="text-center text-xl font-semibold text-gray-800">
            {userData.nickname}
          </h2>
          <p className="text-center text-sm text-gray-600">
            @{userData.username}
          </p>
          <div className="flex justify-center items-center gap-2 mt-3">
            <Link
              to="/create-post"
              onClick={() => setShowEditProfile(!showEditProfile)}
              className=" bg-blue-500 text-white px-4 py-2 transition-all rounded-lg hover:bg-blue-600 active:scale-[0.95]"
            >
              Create Post
            </Link>
            <Link
              to={`/profile/${UserId}/edit`}
              onClick={handleFormShow}
              className=" bg-blue-500 text-white px-4 py-2 transition-all rounded-lg hover:bg-blue-600 active:scale-[0.95]"
            >
              Edit Profile
            </Link>
          </div>
          <div className="w-full mt-4">
            <div className="border px-3 py-2 rounded-xl shadow-inner bg-[#f8f9fe]">
              <p className="text-[11px] text-gray-500">Nickname</p>
              <p className="text-sm text-gray-600">{userData.nickname}</p>
            </div>
            <div className="border px-3 py-2 rounded-xl shadow-inner bg-[#f8f9fe] mt-2">
              <p className="text-[11px] text-gray-500">Username</p>
              <p className="text-sm text-gray-600">@{userData.username}</p>
            </div>
            <div className="border px-3 py-2 rounded-xl shadow-inner bg-[#f8f9fe] mt-2">
              <p className="text-[11px] text-gray-500">Email</p>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="w-full">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 w-full h-28 flex items-center justify-center border rounded-2xl bg-white shadow-lg cursor-pointer transition-all hover:scale-[1.04]">
              <div className="w-2/4 flex justify-center items-center">
                <img
                  className="w-16"
                  src="https://static.vecteezy.com/system/resources/previews/031/738/178/original/follower-icon-design-free-png.png"
                  alt=""
                />
              </div>
              <div className="w-2/4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Follower
                </h3>
                <p className="text-md text-blue-600">10</p>
              </div>
            </div>
            <div className="col-span-1 w-full h-28 flex items-center justify-center border rounded-2xl bg-white shadow-lg cursor-pointer transition-all hover:scale-[1.04]">
              <div className="w-2/4 flex justify-center items-center">
                <img
                  className="w-16"
                  src="https://cdn-icons-png.flaticon.com/512/3391/3391272.png"
                  alt=""
                />
              </div>
              <div className="w-2/4">
                <h3 className="text-xl font-semibold text-gray-800">Posted</h3>
                <p className="text-md text-blue-600">10</p>
              </div>
            </div>
            <div className="col-span-1 w-full h-28 flex items-center justify-center border rounded-2xl bg-white shadow-lg cursor-pointer transition-all hover:scale-[1.04]">
              <div className="w-2/4 flex justify-center items-center">
                <img
                  className="w-16"
                  src="https://icon-library.com/images/facebook-like-icon-png/facebook-like-icon-png-10.jpg"
                  alt=""
                />
              </div>
              <div className="w-2/4">
                <h3 className="text-xl font-semibold text-gray-800">Like</h3>
                <p className="text-md text-blue-600">10</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-white border shadow-lg rounded-2xl mt-4 p-4">
            <div className="flex justify-between items-center ">
              <div className="flex items-center gap-5">
                <h1 className="font-semibold text-lg text-blue-600">
                  Top Post
                </h1>
              </div>
            </div>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full text-left bg-white overflow-hidden rounded-lg dark:bg-gray-800">
                <tbody>
                  {topPost.map((post) => {
                    return (
                      <tr
                        key={post.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="pl-3 pr-6 py-3 text-[14px] dark:text-gray-200">
                          #{post.id}
                        </td>
                        <td className="px-6 py-3">
                          <span className="w-[150px] text-[14px] inline-block whitespace-nowrap overflow-hidden text-ellipsis font-medium dark:text-gray-200">
                            {post.title}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                          {post.category}
                        </td>
                        <td className="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                          1 Week ago
                        </td>
                        <td className="pl-6 py-4 flex items-center gap-2">
                          <button className="px-3 py-1 bg-blue-500 text-white rounded-md active:scale-[0.97]">
                            <i className="bx bx-right-arrow-alt"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
