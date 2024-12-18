import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import SuccessAlert from "../SuccessAlert";
import FailAlert from "../FailAlert";
import { useAuth } from "../auth/AuthProvider";
import MyPost from "../profileTabsContents/MyPost";
import Following from "../profileTabsContents/Following";
import Followers from "../profileTabsContents/Followers";
import Favorites from "../profileTabsContents/Favorites";
import Likes from "../profileTabsContents/Likes";

const Profile = () => {
  const { UserId } = useParams();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
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
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, [UserId, alert]);
  const closeAlert = () => {
    setAlert({ message: "", type: "" });
  };
  if (!showEditProfile) {
    window.history.pushState({}, "", `/profile/${UserId}`);
  }
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Profile</h1>
        </div>
        <AnimatePresence>
          {alert.message && (
            <div>
              {alert.type === "success" ? (
                <div className="fixed top-8 left-[600px]">
                  <SuccessAlert
                    message={alert.message}
                    closeAlert={closeAlert}
                  />
                </div>
              ) : (
                <div className="fixed top-8 left-[600px]">
                  <FailAlert message={alert.message} closeAlert={closeAlert} />
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            window.history.pushState({}, "", `/profile/${UserId}`);
          }}
        >
          {showEditProfile && (
            <Outlet context={{ UserId, setShowEditProfile, setAlert }} />
          )}
        </AnimatePresence>
      </div>
      {userData && (
        <ProfileComponent
          userData={userData}
          UserId={UserId}
          user={user}
          setShowEditProfile={setShowEditProfile}
        />
      )}
    </div>
  );
};

const ProfileComponent = ({ userData, user, UserId, setShowEditProfile }) => {
  const [activeTab, setActiveTab] = useState("posts");
  const tabs = [
    {
      id: "posts",
      label: "My Posts",
      icon: "bxs-collection",
    },
    {
      id: "following",
      label: "Following",
      icon: "bxs-user",
    },
    {
      id: "followers",
      label: "Followers",
      icon: "bxs-user-circle",
    },
    { id: "favorites", label: "Favorites", icon: "bxs-bookmark" },
    { id: "likes", label: "Likes", icon: "bxs-heart" },
  ];

  const handleFormShow = () => {
    setShowEditProfile(true);
  };

  return (
    <div className="grid grid-cols-3 mt-4 gap-4">
      <div className="col-span-1">
        <div className="w-full bg-white shadow-xl border rounded-xl p-4 sticky top-4">
          <div className="w-40 h-40 rounded-full shadow m-auto relative">
            <img
              className="w-full h-full rounded-full object-cover"
              src={userData.profile}
              alt=""
            />
            {user.id == UserId ? (
              <Link
                to={`/profile/${UserId}/edit`}
                onClick={handleFormShow}
                className="absolute top-2 right-2 bg-white shadow-2xl border w-8 h-8 flex justify-center items-center rounded-full text-gray-600"
              >
                <i className="bx bxs-pencil"></i>
              </Link>
            ) : (
              ""
            )}
          </div>
          <h2 className="text-center text-xl font-semibold text-gray-800">
            {userData.nickname}
          </h2>
          <p className="text-center text-sm text-gray-600">
            @{userData.username}
          </p>
          {user.id == UserId ? (
            <div className="flex justify-center items-center gap-2 mt-3">
              <Link
                to="/create-post"
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
          ) : (
            ""
          )}
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
              <p className="text-sm text-gray-600">
                {user.id == UserId ? userData.email : "********@gamil.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="w-full">
          <div className="w-full h-[690px] bg-white border shadow-lg rounded-2xl px-4 pb-4 sticky top-4">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                {tabs.map((tab) => (
                  <li className="me-2" key={tab.id}>
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 justify-center p-4 ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-500 border-b-2 border-transparent"
                      } rounded-t-lg group`}
                    >
                      <i className={`bx ${tab.icon} text-lg`}></i>
                      {tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 h-[585px] overflow-y-scroll rounded-lg overflow-hidden">
              {activeTab === "posts" && <MyPost />}
              {activeTab === "following" && <Following />}
              {activeTab === "followers" && <Followers />}
              {activeTab === "favorites" && <Favorites />}
              {activeTab === "likes" && <Likes />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
