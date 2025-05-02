import { Button, Navbar, Dropdown, TextInput, Avatar } from "flowbite-react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "flowbite/dist/flowbite.min.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect } from "react";
import { useState } from "react";

const Header = () => {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user || {});
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('')
  
useEffect(() =>{
  const urlParams = new URLSearchParams(location.search);
  const searchTermFromUrl = urlParams.get('searchTerm')
  if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl)
  }
}, [location.search])

  const handleSignout = async () => {
      try{
        const res=await fetch('http://localhost:3000/api/user/signout',{
          method: 'POST',
          credentials: 'include',
        });
        const data=await res.json();
        if(!res.ok){
          console.log(data.message);
        }else{
          dispatch(signoutSuccess(data));
          
        }
      }catch(error){
        console.error('Error signing out:', error);
      }
    }
  const handleSubmit = (e) =>{
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }
    
  return (
    <Navbar
  className={`border-b-2 px-4 py-2 ${
    theme === "dark"
      ? "bg-black text-white" // Dark Mode
      : "bg-white text-black" // Light Mode
  }`}
>
  {/* Nik's Blog with Gradient */}
  <Link to="/" className="flex items-center space-x-2 px-0">
    <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-md shadow-md inline-flex items-center">
      Nik's
    </span>
    <span
      className={`font-bold text-lg ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      Blog
    </span>
  </Link>

  {/* Mobile Toggle Button */}
  <Navbar.Toggle />

  {/* Middle Section with Search (Hidden in mobile) */}
  <form onSubmit={handleSubmit} className="hidden lg:flex">
    <TextInput
      type="text"
      placeholder="Search..."
      rightIcon={AiOutlineSearch}
      className={`w-64 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-black"
      }`}
      value={searchTerm}
      onChange={(e)=> setSearchTerm(e.target.value)}
    />
  </form>

  {/* Mobile Search Button */}
  <Button
    className={`w-12 h-10 lg:hidden ${
      theme === "dark" ? "bg-gray-800" : "bg-gray-200"
    }`}
    pill={true}
  >
    <AiOutlineSearch />
  </Button>

  {/* Right Section with Theme and Auth Controls */}
  <div className="flex gap-2 md:order-2">
    {/* Theme Toggle */}
    <button
      className={`w-12 h-10 flex items-center justify-center ${
        theme === "dark" ? "bg-gray-800" : "bg-gray-200"
      } rounded-full`}
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? (
        <FaSun className="text-yellow-400" />
      ) : (
        <FaMoon className="text-gray-300" />
      )}
    </button>

    {/* User Dropdown / Auth Controls */}
    {currentUser ? (
      <Dropdown
        arrowIcon={false}
        inline
        label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
      >
        <Dropdown.Header>
          <span className="block text-sm">@{currentUser.username}</span>
          <span className="block text-sm font-medium">
            {currentUser.email}
          </span>
        </Dropdown.Header>

        <Link to={"/dashboard?tab=profile"}>
          <Dropdown.Item>Profile</Dropdown.Item>
        </Link>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
      </Dropdown>
    ) : (
      <Link to="/sign-in">
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-4 py-2 rounded-lg">
          Sign In
        </Button>
      </Link>
    )}
  </div>

  {/* Navbar Links (Collapsible in Mobile) */}
  <Navbar.Collapse>
    <Navbar.Link
      className={`${
        path === "/"
          ? "text-blue-500 font-bold"
          : theme === "dark"
          ? "text-gray-400"
          : "text-gray-700"
      }`}
      as={"div"}
    >
      <Link to="/">Home</Link>
    </Navbar.Link>
    <Navbar.Link
      className={`${
        path === "/about"
          ? "text-blue-500 font-bold"
          : theme === "dark"
          ? "text-gray-400"
          : "text-gray-700"
      }`}
      as={"div"}
    >
      <Link to="/about">About</Link>
    </Navbar.Link>
    <Navbar.Link
      className={`${
        path === "/projects"
          ? "text-blue-500 font-bold"
          : theme === "dark"
          ? "text-gray-400"
          : "text-gray-700"
      }`}
      as={"div"}
    >
      <Link to="/projects">Projects</Link>
    </Navbar.Link>
  </Navbar.Collapse>
</Navbar>

  );
};

export default Header;
