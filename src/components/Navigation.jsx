import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./auth/AuthProvider";

const Navigation = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data from api");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, []);
  return (
    <div className="w-full py-4 flex justify-end">
      <Link
        to={`/profile/${user.id}`}
        className="w-10 h-10 rounded-full cursor-pointe border p-[2px] border-blue-600"
      >
        <img
          className="w-full h-full object-cover rounded-full"
          src={userData ? userData.profile : ""}
          alt=""
        />
      </Link>
    </div>
  );
};

export default Navigation;
