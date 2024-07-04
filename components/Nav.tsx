"use client";
import { IoLogOut } from "react-icons/io5";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";
const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Cari Kereta",
    path: "/kereta",
  },
  {
    name: "Cari Stasiun",
    path: "/stasiun",
  },
  {
    name: "Cari Rute",
    path: "/rute",
  },
];
const Nav = () => {
  const { data: session, status } = useSession({
    required: false,
  });
  const pathname = usePathname();
  return (
    <div className="flex gap-8">
      {links.map((link, index) => {
        return (
          <>
            <Link
              href={link.path}
              key={index}
              className={`${
                link.path === pathname &&
                "text-white border-b-[3px] rounded-md border-accent"
              } capitaliz font-bold hover:text-[#9ce096] transition-all`}
            >
              {link.name}
            </Link>
          </>
        );
      })}
      {session ? (
        <>
        <p>Hallo Admin</p>
        <div style={{marginTop:-5}} className="cursor-pointer flex flex-row items-center justify-center" onClick={() => signOut()}>
          <p className="mr-1">Logout</p>
          <IoLogOut size={23}/>
        </div>
        </>
      ) : (
        <div className="mt-[2px]">
          <Link className="flex flex-row items-center" href="/loginAdmin">
            <RiAdminFill />
            <p className="ml-1">Login</p>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Nav;
