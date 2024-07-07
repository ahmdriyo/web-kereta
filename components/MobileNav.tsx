"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import { FaRegWindowClose, FaUser } from "react-icons/fa";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { RiAdminFill } from "react-icons/ri";
import { IoLogIn, IoLogOut } from "react-icons/io5";
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

const MobileNav = () => {
  const { data: session, status } = useSession({
    required: false,
  });
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenTogel, setIsOpenTogel] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  const toggleDropdown = () => {
    setIsOpenTogel(!isOpenTogel);
  };
  const handleItemClick = () => {
    setIsOpenTogel(false);
  };
  return (
    <>
      {isOpen ? (
        <button onClick={handleClickClose}>
          <FaRegWindowClose size={24} />
        </button>
      ) : (
        <button onClick={handleClick}>
          <TiThMenu size={24} />
        </button>
      )}
      {isOpen && (
        <div
          className={`fixed right-0 top-7 mt-10 w-64 h-full bg-black shadow-lg z-50 transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="mt-32 mb-40 text-center text-2xl"></div>
          <nav className="flex flex-col justify-center items-center gap-8">
            {links.map((link, index) => (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname &&
                  "text-accent border-b-2 border-accent"
                } text-xl capitalize hover:text-accent transition-all`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          {session ? (
            <>
              <div
                className="cursor-pointer mt-5 flex flex-row items-center justify-center"
                onClick={() => signOut()}
              >
                <p className="mr-1">Logout</p>
                <IoLogOut size={23} />
              </div>
            </>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={toggleDropdown}
                className="flex flex-row items-center mt-5"
              >
                <IoLogIn />
                <p className="ml-1">Login</p>
              </button>
              {isOpenTogel && (
                <div className="absolute right-[15%] mt-14 w-44 bg-[#000000] border rounded shadow-lg z-20">
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
                  
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNav;
