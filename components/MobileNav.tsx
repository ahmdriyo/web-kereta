"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TiThMenu } from "react-icons/ti";
import { FaRegWindowClose } from "react-icons/fa";
import Link from "next/link";
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
        </div>
      )}
    </>
  );
};

export default MobileNav;
