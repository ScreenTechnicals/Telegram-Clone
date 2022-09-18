import React from "react";

const LoadingCard = () => {
  return (
    <div>
      <div className="w-full h-20 flex items-center p-2 space-x-5 border-b rounded-2xl border-[#282828] cursor-pointer hover:bg-[#0000003d] mb-1 relative px-5">
        <div className="space-y-2">
          <div className="w-[100px] rounded-md h-3 bg-[#605f60] animate-pulse"></div>
          <div className="w-[310px] rounded-md h-3 bg-[#918e8e] animate-pulse"></div>
          <div className="w-[220px] rounded-md h-3 bg-[#575757] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
