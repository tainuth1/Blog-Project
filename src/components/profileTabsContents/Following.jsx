import React from "react";

const Following = () => {
  return (
    <div className="flex flex-col gap-5">
      {[1, 2, 3, 4, 5, 7].map((a) => {
        return <UserCard key={a} />;
      })}
    </div>
  );
};

const UserCard = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src="https://z-p3-scontent.fpnh5-3.fna.fbcdn.net/v/t39.30808-6/470217878_1261799578425388_3740335084416730488_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeHhmDYz4MOFNbC5vcy04KonuJzSLdIDaQy4nNIt0gNpDIav-1KuFowfEHUzGxcsSqAQCEdRrH8TLf5JGlZRn3hb&_nc_ohc=DW8SXjNsmN0Q7kNvgHvg6Jc&_nc_oc=Adh4IJ23UTVKLnFX3c1C5k71H6RKeMqRalVD2CzaLNhtN6l3m8dDCycDWF5jPn3rkx4&_nc_zt=23&_nc_ht=z-p3-scontent.fpnh5-3.fna&_nc_gid=Awys_H3VYnsWtKvjvNwm61T&oh=00_AYA-3PEZjnhKENpW40FqB88JWrVLjp0yX62MB_4k8bWA_Q&oe=67672EDA"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="">
          <h2 className="text-gray-700 text-lg font-medium">James Arthur</h2>
          <p className="text-gray-500 text-sm">jamesarthur</p>
        </div>
      </div>
      <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 active:scale-[0.97] rounded-lg">
        Unfollow
      </button>
    </div>
  );
};

export default Following;
