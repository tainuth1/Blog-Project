import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

const Navigation = () => {
  const { user } = useAuth();
  return (
    <div className="w-full py-4 flex justify-end">
      <Link
        to={`/profile/${user.id}`}
        className="w-10 h-10 rounded-full cursor-pointe border p-[2px] border-blue-600"
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={user.profile}
          alt=""
        />
      </Link>
    </div>
  );
};

export default Navigation;
