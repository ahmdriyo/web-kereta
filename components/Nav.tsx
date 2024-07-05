"use client";
import { IoLogOut } from "react-icons/io5";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";
import { IoLogIn } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
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
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleItemClick = () => {
    setIsOpen(false);
  };
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
          {session.user?.email === "admin@gmail.com" ? (
            <p>Halo Admin</p>
          ) : session ? (
            <p>Halo Penumpang</p>
          ) : (
            <></>
          )}
          <div
            style={{ marginTop: -5 }}
            className="cursor-pointer flex flex-row items-center justify-center"
            onClick={() => signOut()}
          >
            <p className="mr-1">Logout</p>
            <IoLogOut size={23} />
          </div>
        </>
      ) : (
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex flex-row items-center"
          >
            <IoLogIn />
            <p className="ml-1">Login</p>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-[#000000] border rounded shadow-lg z-20">
              <Link
                href="/loginAdmin"
                className="w-[174px] px-2 py-2 text-white flex flex-row items-center rounded hover:bg-[#242222]"
              >
                <div
                  onClick={handleItemClick}
                  className="flex flex-row items-center"
                >
                  <RiAdminFill className=" mr-2" />
                  Login Admin
                </div>
              </Link>
              <Link
                href="/loginPenumpang"
                className="flex flex-row items-center px-2 py-2 w-[174px] text-white rounded hover:bg-[#242222]"
              >
                <div
                  onClick={handleItemClick}
                  className="flex flex-row items-center"
                >
                  <FaUser className=" mr-2" />
                  Login Penumpang
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Nav;
