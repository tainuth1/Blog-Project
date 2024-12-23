import React from "react";
import ChatList from "../chat/ChatList";
import { Outlet, useParams } from "react-router-dom";

const Message = () => {
  const { ChatId } = useParams();
  return (
    <div className="w-full h-[600px]">
      <div className="flex items-center gap-5">
        <h1 className="font-semibold text-3xl text-gray-800">Chat</h1>
      </div>
      <div className="h-[550px] grid grid-cols-7 gap-5 mt-5">
        <div className="h-full col-span-2 bg-white rounded-lg shadow-lg p-2 border">
          <ChatList />
        </div>
        <div className="h-full col-span-5 bg-white rounded-lg shadow-lg border overflow-hidden">
          {ChatId ? (
            <Outlet />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              Select a chat to start messaging.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
