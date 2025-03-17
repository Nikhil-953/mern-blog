import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* Flex container for responsiveness */}
      <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between w-full gap-5">
        
        {/* Left Section */}
        <div className="md:w-1/2 flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl flex items-center space-x-1">
            <span className="px-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded shadow-md inline-flex items-center">
              Nik's
            </span>
            <span className="text-black dark:text-white font-bold text-2xl">Blog</span>
          </Link>
          <p className="text-sm mt-2 text-gray-700">
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>

        {/* Right Section - Moves right on larger screens */}
        <div className="md:w-1/2 md:flex md:justify-end mt-6 md:mt-0 flex-1">
          <form className="w-full max-w-sm flex flex-col gap-4">
            <div>
              <Label value="Your username" className="text-left block font-semibold mb-1" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Your email" className="text-left block font-semibold mb-1" />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div>
            <div>
              <Label value="Your password" className="text-left block font-semibold mb-1" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            {/* Fixed Button Gradient */}
            <Button 
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow-md w-full"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500 font-bold"> Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
