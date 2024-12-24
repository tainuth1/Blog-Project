import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { AnimatePresence } from "motion/react";

const Chatting = () => {
  const { user } = useAuth();
  const { ChatId } = useParams();
  const [message, setMessage] = useState("");
  const [userChat, setUserChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${ChatId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const userData = await response.json();
        setUserChat(userData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [ChatId]);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/messages?` +
          new URLSearchParams({
            senderId: user.id,
            receiverId: ChatId,
            _sort: "created_at",
            _order: "asc",
          })
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages.");
      }
      const sentMessages = await response.json();

      const receivedResponse = await fetch(
        `http://localhost:3000/messages?` +
          new URLSearchParams({
            senderId: ChatId,
            receiverId: user.id,
            _sort: "created_at",
            _order: "asc",
          })
      );
      const receivedMessages = await receivedResponse.json();

      const allMessages = [...sentMessages, ...receivedMessages].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setMessages(allMessages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchMessages, 500);
    return () => clearInterval(interval);
  });

  // Send message
  const sendMessage = async () => {
    try {
      const newMessage = {
        id: `${Date.now()}`,
        senderId: user.id,
        receiverId: ChatId,
        message,
        created_at: new Date().toISOString(),
      };
      const response = await fetch(`http://localhost:3000/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });
      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
      setMessages((prev) => [...prev, newMessage]); // Update messages locally
    } catch (error) {
      console.error(error);
    }
  };
  const clearAllMessages = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/messages?` +
          new URLSearchParams({
            senderId: user.id,
            receiverId: ChatId,
          })
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages.");
      }
      const messages = await response.json();
      const deletePromises = messages.map((msg) => {
        return fetch(`http://localhost:3000/messages/${msg.id}`, {
          method: "DELETE",
        });
      });
      await Promise.all(deletePromises);
      setShowMenu(false);
      setConfirmDelete(false);
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/messages/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete message.");
      }
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      sendMessage();
      setMessage("");
    } else {
      console.log("Empty message");
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className="border-b-2 px-3 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <img
              src={userChat.profile}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col w-[165px]">
            <h1 className="font-semibold text-sm text-gray-700">
              {userChat.nickname}
            </h1>
            <p className="text-gray-500 text-[13px] line-clamp-1">
              Active 2m ago {/* Replace with dynamic status if needed */}
            </p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-7 h-7 rounded-full flex justify-center items-center bg-blue-400 text-white active:bg-blue-500 focus:outline-none"
          >
            <i className="bx bx-dots-horizontal-rounded"></i>
          </button>
          {showMenu && (
            <ul className="absolute top-8 right-0 w-40 bg-white shadow-md rounded-lg p-1 z-[1]">
              <Link
                to={`/profile/${userChat.id}`}
                className="transition-all rounded-lg py-2 px-2 hover:bg-gray-200"
              >
                <button className="w-full text-left text-sm text-gray-600 hover:text-gray-900">
                  View Profile
                </button>
              </Link>
              <li
                onClick={() => setConfirmDelete(true)}
                className="transition-all rounded-lg py-2 px-2 mt-1 hover:bg-gray-200"
              >
                <button className="w-full text-left text-sm text-gray-600 hover:text-gray-900">
                  Clear Message
                </button>
              </li>
            </ul>
          )}
        </div>
        <AnimatePresence>
          {confirmDelete && (
            <div
              onClick={() => setConfirmDelete(false)}
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[1]"
            >
              <div className="w-[300px] bg-white rounded-lg p-4">
                <h1 className="text-lg font-semibold text-gray-700">
                  Clear Message
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                  Are you sure you want to clear all messages?
                </p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-4 py-2 text-sm text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={clearAllMessages}
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full h-[430px] overflow-y-scroll p-2">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div key={msg.id} className="mt-2">
              {msg.senderId === user.id ? (
                <div className="group w-full flex justify-end ">
                  <div className="relative inline-block max-w-96 px-4 p-2 rounded-t-2xl rounded-bl-2xl bg-blue-500 text-white text-sm break-words">
                    {msg.message}
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="absolute top-2 -left-8 w-6 h-6 text-center content-center rounded-full bg-gray-400 text-gray-200 group-hover:block hidden"
                    >
                      <i className="bx bx-trash"></i>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-start">
                  <div className="inline-block max-w-96 px-4 p-2 rounded-t-2xl rounded-br-2xl bg-gray-200 text-gray-700 text-sm break-words">
                    {msg.message}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No messages yet</div>
        )}
      </div>
      <div className="w-full absolute bottom-0 border-t py-3 bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center gap-2 px-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-2 py-2 border-2 text-sm rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className={`w-16 h-10 rounded-lg flex justify-center items-center ${
              message.trim()
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!message.trim()}
          >
            <i className="bx bx-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatting;
