import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex items-center px-4 md:px-12 py-2 justify-between top-0 fixed w-full z-50 shadow bg-white">
      <Link href={"/"} className="flex items-center">
        <Image src={"/xaridshop.png"} alt="logo" width={45} height={40} />
        <p className="font-bold">
          {" "}
          <span style={{ color: "#128cc0" }}>E</span>n
          <span style={{ color: "#f78d1e" }}>C</span>ash
        </p>
      </Link>
      
      <div className="flex items-center space-x-2.5 text-sm">
        <nav className="hidden md:flex space-x-4 md:ml-auto flex-wrap items-center text-base justify-center">
          <Link href={"/"} className="mr-5 hover:text-gray-900">
            Home Page
          </Link>
          <Link href={"/products"} className="mr-5 hover:text-gray-900">
            All products
          </Link>
          <Link href={"/contacts"} className="mr-5 hover:text-gray-900">
            Contacts
          </Link>
        </nav>
        <Link href={"/shopping-cart"} className="hidden md:block">
          <button className="button bg-blue-600 text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-black">
            My bag
          </button>
        </Link>
        
      </div>
      <div className="block md:hidden">
        <button className="flex items-center px-3 py-2 border-2 rounded text-blue-600 border-blue-600 ">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
