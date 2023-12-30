import clsx from "clsx";
import React from "react";

const UserInfo = ({ active }: { active: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={clsx(
          "w-12 h-12 flex justify-center items-center bg-white rounded-full text-xl font-semibold text-sky-500 transition-all",
          {
            "text-2xl": active,
          }
        )}
      >
        S
      </span>
      {active && (
        <div className="text-sm flex flex-col justify-center">
          <p className="font-semibold text-white">@admin.com</p>
          <p className=" text-gray-200">Admin</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
