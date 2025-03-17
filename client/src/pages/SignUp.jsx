import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";

export default function SignUp() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    setErrorMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await res.json(); // Parse JSON response

      if (!res.ok) {
        return setErrorMessage(responseData.message || `HTTP error! Status: ${res.status}`);
      }

      console.log("Signup successful:", responseData);
      // Redirect or handle success (e.g., navigate to login page)

      setLoading(false);
      navigate("/sign-in");
      if(res.ok){
        navigate("/sign-in");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage("Signup failed. Please try again.");
    }

    setLoading(false);
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
            This is a demo project. You can sign up with your email and password or with Google.
          </p>
        </div>

        <div className="md:w-1/2 md:flex md:justify-end mt-6 md:mt-0 flex-1">
          <div className="w-full max-w-sm">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>  
              <div>
                <Label value="Your username" className="text-left block font-semibold mb-1" />
                <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
              </div>
              <div>
                <Label value="Your email" className="text-left block font-semibold mb-1" />
                <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
              </div>
              <div>
                <Label value="Your password" className="text-left block font-semibold mb-1" />
                <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
              </div>

              <Button 
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow-md w-full"
                type="submit"
                disabled={loading}
              >
                {
                loading ? (
                  <>
                  <Spinner size='sm'/>
                  <span className="pl-3">Loading...</span>
                  </>
                ): ("Sign Up"
                )
                }
              </Button>
            </form>

            {errorMessage && (
              <Alert className="mt-4" color="failure">
                {errorMessage}
              </Alert>
            )}

            <div className="flex justify-center gap-2 text-sm mt-5">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-blue-500 font-bold">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
