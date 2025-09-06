// src/pages/Login.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Backend response:", data); // Debug line
      console.log("Response status:", response.status); // Debug line

      // Check if we have token (which means successful login)
      if (data.token && data.username) {
        // Actually log the user in using AuthContext
        login({
          username: data.username,
          email: email,
          token: data.token
        });
        
        toast.success("Login successful! Welcome back!");
        
        // Redirect to symptoms page after successful login
        setTimeout(() => {
          navigate("/symptoms");
        }, 1500);
        
      } else {
        toast.error(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Login</h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Welcome back! Please enter your credentials.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`py-3 rounded font-semibold transition-colors ${
              isLoading 
                ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span 
              onClick={() => navigate("/register")} 
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;