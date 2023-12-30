import Link from "next/link";
import clsx from "clsx";

import { headerLinks } from "@/constants/config";

export default function Header() {
  return (
    <header className="flex justify-center items-center md:h-16 absolute w-full z-10">
      <nav className="max-w-[70rem] w-full flex justify-end items-center">
        {headerLinks.map((link) => (
          <Link
            key={link.url}
            className={clsx(
              "text-gray-600 hover:scale-105 transition-all text-lg px-4 py-2",
              {
                "text-sky-500": link.url === "/auth",
              }
            )}
            href={link.url}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
