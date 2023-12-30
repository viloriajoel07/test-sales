import Link from "next/link";
import clsx from "clsx";
import React from "react";
import { usePathname } from "next/navigation";

type ULinkProps = {
  item: {
    id: number;
    title: string;
    icon: React.ReactNode;
    link: string;
  };
  menuActive: boolean;
};

const ULink = ({ item, menuActive }: ULinkProps) => {
  const { link, icon, title } = item;
  const path = usePathname();

  return (
    <Link href={link}>
      <li
        title={title}
        className={clsx(
          "w-20 flex justify-center py-4 items-center hover:bg-sky-700 transition-all",
          {
            "bg-sky-800": path === link,
            "!justify-start w-56 px-6 gap-4": menuActive,
          }
        )}
      >
        <span className="text-white">{icon}</span>
        {menuActive && <span className="text-white">{title}</span>}
      </li>
    </Link>
  );
};

export default ULink;
