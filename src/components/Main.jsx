import React from "react";
import SideBar from "./SideBar";
import Content from "./Content";
import Navigation from "./Navigation";

const Main = () => {
  return (
    <div className="w-full flex">
      <SideBar />
      <div className="w-full h-full">
        <Navigation />
        <Content />
      </div>
    </div>
  );
};

export default Main;
