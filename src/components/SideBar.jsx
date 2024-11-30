import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const menuStyle =
  "w-full flex items-center gap-3 pl-5 py-4 text-md text-gray-600 font-medium rounded-r-lg block";

const SideBar = () => {
  const location = useLocation();
  return (
    <div className="w-64 py-4">
      <div className="w-full text-center pl-5 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">Blogger.</h1>
        <button className="bg-[#E5ECFF] px-2 py-1 rounded-lg active:scale-[0.98] mt-1">
          <i className="bx text-2xl text-gray-500 bx-left-arrow-alt"></i>
        </button>
      </div>
      <div className="mt-5">
        <p className="text-[12px] pl-5 text-gray-500 ">General</p>
        <ul className="mt-1">
          <li className="w-full">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${menuStyle} ${
                  location.pathname === "/" ||
                  location.pathname.startsWith("/blog/")
                    ? "active"
                    : ""
                }`
              }
            >
              <i className="bx bxs-shapes text-xl"></i> Home
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to="/create-post" className={menuStyle}>
              <i className="bx bxl-blogger text-xl"></i> Create Post
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to="/my-post" className={menuStyle}>
              <i className="bx bxs-book-content text-xl"></i> My Post
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink to="/settings" className={menuStyle}>
              <i className="bx bxs-cog text-xl"></i> Settings
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
