import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { use } from "react";

const UserList = ({ friend }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const fetchMessages = async () => {
    try {
      // Fetch messages sent by the current user to the friend
      const sentResponse = await fetch(
        `http://localhost:3000/messages?` +
          new URLSearchParams({
            senderId: user.id,
            receiverId: friend.id,
            _sort: "created_at",
            _order: "asc",
          })
      );
      if (!sentResponse.ok) {
        throw new Error("Failed to fetch sent messages.");
      }
      const sentMessages = await sentResponse.json();

      // Fetch messages received by the current user from the friend
      const receivedResponse = await fetch(
        `http://localhost:3000/messages?` +
          new URLSearchParams({
            senderId: friend.id,
            receiverId: user.id,
            _sort: "created_at",
            _order: "asc",
          })
      );
      if (!receivedResponse.ok) {
        throw new Error("Failed to fetch received messages.");
      }
      const receivedMessages = await receivedResponse.json();

      // Merge and sort all messages by created_at
      const allMessages = [...sentMessages, ...receivedMessages].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setMessages(allMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 500);
    return () => clearInterval(interval);
  }, [user.id, friend.id]);
  return (
    <Link
      to={`/message/chat/${friend.id}`}
      className="w-full flex justify-between hover:bg-gray-100 px-2 py-3 rounded-lg transition-colors"
    >
      <div className="flex items-start gap-2">
        <div className="w-11 h-11 rounded-full overflow-hidden">
          <img
            src={friend.profile}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex flex-col w-[165px]">
          <h1 className="font-semibold text-sm text-gray-700">
            {friend.nickname}
          </h1>
          <p className="text-gray-500 text-[13px] line-clamp-1">
            {messages.length > 0
              ? messages[messages.length - 1].senderId === user.id
                ? "You: "
                : ""
              : ""}
            {messages.length > 0
              ? messages[messages.length - 1].message
              : "No messages yet."}
          </p>
        </div>
      </div>
      {/* <del className="text-[11px] text-gray-500">2 Days</del> */}
    </Link>
  );
};

export default UserList;
