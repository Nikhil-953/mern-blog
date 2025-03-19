import { Button, Navbar, NavbarCollapse, Dropdown, TextInput, Avatar } from "flowbite-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "flowbite/dist/flowbite.min.css";
import { FaMoon } from "react-icons/fa";
import { useSelector } from "react-redux";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user || {});

  return (
    <Navbar className="border-b-2 px-4 py-2 flex justify-between items-center">
      {/* Nik's Blog with Gradient */}
      <Link to="/" className="flex items-center space-x-2 px-0">
        <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-md shadow-md inline-flex items-center">
          Nik's
        </span>
        <span className="text-black dark:text-white font-bold text-lg">Blog</span>
      </Link>

      {/* Search Input */}
      <form className="hidden lg:flex">
        <TextInput type="text" placeholder="Search..." rightIcon={AiOutlineSearch} className="w-64" />
      </form>

      <Button className="w-12 h-10 lg:hidden" color="gray" pill={true}>
        <AiOutlineSearch />
      </Button>

      <div className="flex gap-2 md:order-2">
        <button className="w-12 h-10 lg:hidden sm:inline" color="gray" pill>
          <FaMoon />
        </button>

        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium">{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
            <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
            <Dropdown.Item>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-4 py-2 rounded-lg">
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

      {/* Navbar Links */}
      <Navbar.Collapse>
        <Navbar.Link className={path === "/" ? "text-blue-500 font-bold" : "text-gray-700"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link className={path === "/about" ? "text-blue-500 font-bold" : "text-gray-700"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link className={path === "/projects" ? "text-blue-500 font-bold" : "text-gray-700"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
