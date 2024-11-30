import React from "react";

const Comment = () => {
  return (
    <div className="">
      <div className="flex gap-1">
        <div className="">
          <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
            <img
              className="w-full h-full object-cover"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
              alt=""
            />
          </div>
        </div>
        <div className="">
          <h2 className="text-[12px] transition-all text-gray-800 hover:underline cursor-pointer">
            Tai Nuth
          </h2>
          <p className="text-[13.5px] text-[#242424]">
            Discover 8 new and free AI tools that can significantly enhance your
            productivity.
          </p>
          <span className="text-[12px]">Just Now</span>
        </div>
      </div>
      
    </div>
  );
};

export default Comment;
