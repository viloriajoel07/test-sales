import React from "react";
import Link from "next/link";

import { menuOptions } from "@/constants/config";

import { IconLogout } from "@tabler/icons-react";

const HorizontalBar = () => {
  return (
    <div className="fixed h-20 bg-sky-500 z-20 flex justify-center lg:hidden bottom-0 w-full gap-4">
      {menuOptions.map((option, index) => (
        <Link
          href={option.link}
          key={option.id}
          className="flex flex-1 flex-col items-center text-white h-full justify-center"
        >
          {option.icon}
          <p>{option.title}</p>
        </Link>
      ))}
      <Link
        href="/"
        className="flex flex-1 flex-col items-center text-white h-full justify-center"
      >
        <IconLogout />
        <p>Salir</p>
      </Link>
    </div>
  );
};

export default HorizontalBar;
