import { Button } from "flowbite-react";
import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { auth, googleProvider, signInWithPopup } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      // Sign in with Google
      const resultFromGoogle = await signInWithPopup(auth, googleProvider);

      // Send data to your backend for further authentication
      const res = await fetch("/api/auth/google", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhoto: resultFromGoogle.user.photoURL,
        }),
      });

      const responseData = await res.json(); // Parse JSON response
      if (res.ok) {
        dispatch(signInSuccess(responseData));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleClick}
      className="bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold px-4 py-2 rounded-lg shadow-md w-full flex items-center justify-center transition-all duration-300 transform hover:from-orange-400 hover:to-pink-400 hover:scale-105 hover:shadow-xl focus:outline-none active:bg-white active:text-black"
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2 text-white active:text-black" />
      Continue with Google
    </Button>
  );
}
