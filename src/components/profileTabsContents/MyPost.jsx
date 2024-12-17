import React from "react";

const MyPost = () => {
  return (
    <div className="w-full grid grid-cols-4 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((a) => {
        return <PostCard key={a} />;
      })}
    </div>
  );
};

const PostCard = () => {
  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden cursor-pointer">
      <img
        src="https://z-p3-scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/470217878_1261799578425388_3740335084416730488_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHhmDYz4MOFNbC5vcy04KonuJzSLdIDaQy4nNIt0gNpDIav-1KuFowfEHUzGxcsSqAQCEdRrH8TLf5JGlZRn3hb&_nc_ohc=DW8SXjNsmN0Q7kNvgHvg6Jc&_nc_oc=Adh4IJ23UTVKLnFX3c1C5k71H6RKeMqRalVD2CzaLNhtN6l3m8dDCycDWF5jPn3rkx4&_nc_zt=23&_nc_ht=z-p3-scontent.fpnh5-3.fna&_nc_gid=Awys_H3VYnsWtKvjvNwm61T&oh=00_AYA-3PEZjnhKENpW40FqB88JWrVLjp0yX62MB_4k8bWA_Q&oe=67672EDA"
        alt=""
        className="w-full h-full object-cover"
      />
      <span className="absolute flex items-baseline gap-1 text-sm bottom-2 left-2 z-[1] text-white">
        <i className="bx bxs-heart"></i> 20K
      </span>
    </div>
  );
};

export default MyPost;
