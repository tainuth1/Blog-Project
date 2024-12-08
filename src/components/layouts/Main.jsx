import React from "react";
import SideBar from "../SideBar";
import Navigation from "../Navigation";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="w-full flex gap-6 pr-4">
      <div className="h-[100vh] sticky top-0">
        <SideBar />
      </div>
      <div className="w-full h-full">
        <Navigation />
        <div
          className="bg-white p-6 rounded-2xl"
          style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px" }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Main;
