import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import { useAuth } from "../auth/AuthProvider";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import ViewContent from "../ViewContent";
import CreatePost from "../pages/CreatePost";
import Settings from "../pages/Settings";
import MyPost from "../pages/MyPost";
import EditForm from "../EditForm";
import Register from "../auth/Register";
import Loading from "../Loading";
import Profile from "../pages/Profile";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="fixed top-5 left-[750px]">
        <Loading />
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
};

const AppRouters = () => {
  return (
    <div className="w-full">
      <div className="w-full bg-[#f8f9fe]">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Main />
              </PrivateRoute>
            }
          >
            <Route path="" element={<Home />}>
              <Route path="blog/:PostId" element={<ViewContent />} />
            </Route>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/my-post" element={<MyPost />}>
              <Route path="edit/:EditId" element={<EditForm />} />
            </Route>
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile/:UserId" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default AppRouters;
