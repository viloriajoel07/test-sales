"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { IconLogout, IconChevronRight } from "@tabler/icons-react";
import ULink from "./ULink";
import Link from "next/link";
import clsx from "clsx";
import { menuOptions } from "@/constants/config";
import { Button } from "..";
import UserInfo from "./UserInfo";

type SideBarProps = {
  active: boolean;
  setActive: Dispatch<SetStateAction<boolean>>;
};

const SideBar = ({ setActive, active }: SideBarProps) => {
  return (
    <div
      className={clsx(
        "w-20 h-screen fixed bg-sky-500 hidden lg:flex justify-center flex-col transition-all items-center",
        {
          "w-56": active,
        }
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-3 mt-8",
          {
            "!justify-start w-full px-6 !flex-row-reverse": active,
          }
        )}
      >
        <Button
          variant="outline"
          className="text-white border-none !px-0 !rounded-full"
          onClick={() => setActive(!active)}
        >
          <IconChevronRight
            size={26}
            className={clsx({
              "transform rotate-180": active,
            })}
          />
        </Button>
        <UserInfo active={active} />
      </div>
      <nav className="flex flex-grow justify-center items-center w-full">
        <ul className="flex flex-col gap-1 w-full">
          {menuOptions.map((item) => (
            <ULink item={item} key={item.id} menuActive={active} />
          ))}
        </ul>
      </nav>
      <Link
        href="/"
        className={clsx(
          "mb-6 text-white flex items-center justify-center h-fit py-4 w-full hover:bg-sky-700 transition-all",
          {
            "!justify-start px-6 gap-4": active,
          }
        )}
      >
        <IconLogout size={26} />
        {active && "Logout"}
      </Link>
    </div>
  );
};

export default SideBar;
