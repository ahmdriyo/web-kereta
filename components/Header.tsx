import Link from "next/link";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
const Header = () => {
  return (
    <header className="py-5 text-white bg-black">
      <div className=" container mx-auto flex justify-between md:justify-around items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold">
            Kereta Cepat<span className="text-blue-400 ">.</span><span className="text-[14px] font-light">@ahmd_riyo</span>
          </h1>
        </Link>
        <div className="hidden md:flex items-center gap-10">
          <Nav />
        </div>
        <div className=" md:hidden justify-end">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
