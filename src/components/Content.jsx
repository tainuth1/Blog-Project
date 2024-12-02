import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Contents/Home";
import CreatePost from "./Contents/CreatePost";
import MyPost from "./Contents/MyPost";
import Settings from "./Contents/Settings";
import ViewContent from "./ViewContent";
import EditForm from "./EditForm";

const Content = () => {
  return (
    <div className="w-full px-4">
      <div
        className="w-full bg-white p-6 rounded-2xl "
        style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px" }}
      >
        <Routes>
          <Route path="/" element={<Home />} >
            <Route path="blog/:PostId" element={<ViewContent />} />
          </Route>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-post" element={<MyPost />} >
            <Route path="edit/:EditId" element={<EditForm />} />
          </Route>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

export default Content;
