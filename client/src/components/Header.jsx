import { Button, Navbar, NavbarCollapse, TextInput } from "flowbite-react";
import React from "react";
import { Link, useLocation} from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "flowbite/dist/flowbite.min.css";
import { FaMoon } from "react-icons/fa";

const Header = () => {
    const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 px-4 py-2 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        {/* Fix gradient and text visibility */}
        <span
          className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
          text-black font-bold rounded-lg shadow-md inline-block">
          Nik's
        </span>
        <span className="text-black font-bold text-lg">Blog</span>
      </Link>
      <form  className="hidden lg:flex">
        <TextInput type="text" 
        placeholder="Search..." 
        rightIcon={AiOutlineSearch} 
        className="w-64"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill={true}>
         <AiOutlineSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <button className="w-12 h-10 lg:hidden sm:inline" color="gray" pill>
            <FaMoon />
        </button>
        <Link to="/sign-in"> 
        <Button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-4 py-2 rounded-lg" outline>
  Sign In
</Button>

        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link className={path === '/' ? "text-blue-500 font-bold" : "text-gray-700"} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link className={path === '/about' ? "text-blue-500 font-bold" : "text-gray-700"} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link className={path === '/projects' ? "text-blue-500 font-bold" : "text-gray-700"} as={'div'}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
