import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import UserList from "./UserList";

const ChatList = () => {
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/users/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const userData = await response.json();
        setCurrentUser(userData);
        const friendsPromise = userData.following.map(async (userId) => {
          const userResponse = await fetch(
            `http://localhost:3000/users/${userId}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch following user data.");
          }
          return userResponse.json();
        });
        const friendsData = await Promise.all(friendsPromise);
        const friendsCanChatWithMe = friendsData.filter((friend) =>
          friend.following.includes(user.id)
        );
        setFriends(friendsCanChatWithMe);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const filterUser = friends.filter((friend) =>
    friend.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-ful h-full">
      <div className="relative mt-1 px-2">
        <input
          type="text"
          id="password"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search..."
        />
        <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-3 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
          <i className="bx bx-search-alt-2"></i>
        </button>
      </div>
      <div className="h-[475px] border-t-2 flex flex-col items-center gap-1 mt-2 overflow-y-scroll">
        {loading ? (
          <div className="flex flex-row gap-1 mt-4">
            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-3 h-3 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
          </div>
        ) : (
          filterUser.map((friend) => {
            return <UserList key={friend.id} friend={friend} />;
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
