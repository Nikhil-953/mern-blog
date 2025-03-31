import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill in all fields"));
    }

    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json(); // Parse JSON response

      if (!res.ok) {
        dispatch(signInFailure(responseData.message));
        return;
      }

      console.log("Signin successful:", responseData);
      dispatch(signInSuccess(responseData));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between w-full gap-5">
        <div className="md:w-1/2 flex-1">
          <Link to="/" className="flex items-center space-x-2 px-0">
            <span className="px-3 py-2 text-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-md shadow-md inline-flex items-center">
              Nik's
            </span>
            <span className="text-black dark:text-white font-bold text-2xl">Blog</span>
          </Link>

          <p className="text-sm mt-2 text-gray-700">
            This is a demo project. You can sign in with your email and password or with Google.
          </p>
        </div>

        <div className="md:w-1/2 md:flex md:justify-end mt-6 md:mt-0 flex-1">
          <div className="w-full max-w-sm">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Your email" className="text-left block font-semibold mb-1" />
                <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
              </div>
              <div>
                <Label value="Your password" className="text-left block font-semibold mb-1" />
                <TextInput type="password" placeholder="********" id="password" onChange={handleChange} />
              </div>

              <Button
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow-md w-full"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
              <OAuth />
            </form>

            {errorMessage && (
              <Alert className="mt-4" color="failure">
                {errorMessage}
              </Alert>
            )}

            <div className="flex justify-center gap-2 text-sm mt-5">
              <span>Don't have an account?</span>
              <Link to="/sign-up" className="text-blue-500 font-bold">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
