import React from "react";
import { useParams } from "react-router-dom";

const Chatting = () => {
  const { ChatId } = useParams();
  return (
    <div className="w-full h-full relative">
      <div className="border-b-2 px-3 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-full overflow-hidden">
            <img
              src={
                "https://i.pinimg.com/736x/86/d5/2b/86d52b51acf85cb0b86c052ea2ae6e53.jpg"
              }
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col w-[165px]">
            <h1 className="font-semibold text-sm text-gray-700">John Doe</h1>
            <p className="text-gray-500 text-[13px] line-clamp-1">
              Active 2m ago {ChatId}
            </p>
          </div>
        </div>
        <div className="">
          <button className="w-7 h-7 rounded-full flex justify-center items-center bg-blue-400 text-white active:bg-blue-500 focus:outline-none">
            <i className="bx bx-dots-horizontal-rounded"></i>
          </button>
        </div>
      </div>
      <div className="w-full h-[430px] overflow-scroll p-2">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="w-28 h-28 rounded-full overflow-hidden">
            <img
              src={
                "https://i.pinimg.com/736x/86/d5/2b/86d52b51acf85cb0b86c052ea2ae6e53.jpg"
              }
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h2 className="text-[25px] font-medium">John Deo</h2>
        </div>
        <div className="w-full pt-8 pb-2">
          <div className="w-full flex justify-end">
            <div className="inline-block max-w-96 px-4 p-2 rounded-t-2xl rounded-bl-2xl bg-[#2265FF] text-white text-sm break-words">
              This is a sample message to demonstrate the chat design.
            </div>
          </div>
          <div className="w-full flex justify-start mt-4">
            <div className="inline-block max-w-96 px-4 p-2 rounded-t-2xl rounded-br-2xl bg-[#F0F0F0] text-gray-700 text-sm break-words">
              This is a sample message to demonstrate the chat design.
            </div>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-0 border-t py-3 bg-white">
        <form className="w-full flex items-center gap-2 justify-between px-2">
          <input
            type="text"
            className="w-full h-full px-2 py-2 border-2 text-gray-700 text-sm border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="Type your message..."
          />
          <button className="w-16 h-10 rounded-lg flex justify-center items-center bg-blue-400 text-white active:bg-blue-500 focus:outline-none">
            <i className="bx bx-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatting;
