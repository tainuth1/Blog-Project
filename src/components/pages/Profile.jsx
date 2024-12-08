import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-5">
          <h1 className="font-semibold text-3xl text-gray-800">Profile</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 mt-4 gap-4">
        <div className="col-span-1">
          <div className="w-full bg-white shadow-xl border rounded-xl p-4">
            <div className="w-40 h-40 rounded-full shadow m-auto relative">
              <img
                className="w-full h-full rounded-full object-cover"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                alt=""
              />
              <button className="absolute top-2 right-2 bg-white shadow-2xl border w-8 h-8 flex justify-center items-center rounded-full text-gray-600">
                <i className="bx bxs-pencil"></i>
              </button>
            </div>
            <h2 className="text-center text-xl font-semibold text-gray-800">
              Tai Nuth
            </h2>
            <p className="text-center text-sm text-gray-600">@tainuth1</p>
            <div className="flex justify-center items-center gap-2 mt-3">
              <button className=" bg-blue-500 text-white px-4 py-2 transition-all rounded-lg hover:bg-blue-600 active:scale-[0.95]">
                Create Post
              </button>
              <button className=" bg-blue-500 text-white px-4 py-2 transition-all rounded-lg hover:bg-blue-600 active:scale-[0.95]">
                Edit Profile
              </button>
            </div>
            <div className="w-full mt-4">
              <div className="border px-3 py-2 rounded-xl shadow-inner bg-[#f8f9fe]">
                <p className="text-[11px] text-gray-500">Nickname</p>
                <p className="text-sm text-gray-600">Tai Nuth</p>
              </div>
              <div className="border px-3 py-2 rounded-xl shadow-inner bg-[#f8f9fe] mt-2">
                <p className="text-[11px] text-gray-500">Username</p>
                <p className="text-sm text-gray-600">@tainuth1</p>
              </div>
              <div className="border px-3 py-2 rounded-xl shadow-inner bg-[#f8f9fe] mt-2">
                <p className="text-[11px] text-gray-500">Email</p>
                <p className="text-sm text-gray-600">tainuth1@gmail.com</p>
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
                  <h3 className="text-xl font-semibold text-gray-800">
                    Posted
                  </h3>
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
                    {[1, 2, 3, 4, 5].map((a) => {
                      return (
                        <tr
                          key={a}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="pl-3 pr-6 py-3 text-[14px] dark:text-gray-200">
                            #00001111
                          </td>
                          <td className="px-6 py-3">
                            <span className="w-[150px] text-[14px] inline-block whitespace-nowrap overflow-hidden text-ellipsis font-medium dark:text-gray-200">
                              All Java Script
                            </span>
                          </td>
                          <td className="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                            Technology
                          </td>
                          <td className="px-6 py-3 text-[14px] text-gray-600 dark:text-gray-300">
                            1 Week ago
                          </td>
                          <td className="pl-6 py-4 flex items-center gap-2">
                            <button
                              className="px-3 py-1 bg-blue-500 text-white rounded-md active:scale-[0.97]"
                            >
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
    </div>
  );
};

export default Profile;
