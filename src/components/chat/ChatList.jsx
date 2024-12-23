import React from "react";
import { Link } from "react-router-dom";

const ChatList = () => {
  return (
    <div className="w-ful h-full">
      <div className="relative mt-1 px-2">
        <input
          type="text"
          id="password"
          className="w-full pl-3 pr-10 py-2 border-2 border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder="Search..."
        />
        <button className="block w-7 h-7 text-center text-xl leading-0 absolute top-3 right-2 text-gray-400 focus:outline-none hover:text-gray-900 transition-colors">
          <i className="bx bx-search-alt-2"></i>
        </button>
      </div>
      <div className="h-[475px] border-t-2 flex flex-col gap-1 mt-2 overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((chat) => {
          return (
            <Link
              key={chat}
              to={`/message/chat/${chat}`}
              className="w-full flex justify-between hover:bg-gray-100 px-2 py-3 rounded-lg transition-colors"
            >
              <div className="flex items-start gap-2">
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
                  <h1 className="font-semibold text-sm text-gray-700">
                    John Doe
                  </h1>
                  <p className="text-gray-500 text-[13px] line-clamp-1">
                    Hello, how are you?
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500">2 Days</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
