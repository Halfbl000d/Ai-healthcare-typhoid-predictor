import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "", // ✅ Correct field name
    email: "",
    age: "",
    gender: "",
    city: "",
    state: "",
    password: "",
    confirm_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        toast.success("Registration successful! Please login with your credentials.");
        
        // Clear form
        setFormData({
          first_name: "",
          last_name: "",
          phone_number: "", // ✅ Consistent field name
          email: "",
          age: "",
          gender: "",
          city: "",
          state: "",
          password: "",
          confirm_password: "",
        });

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
        
      } else {
        toast.error(data.error || "Registration failed. Please try again.");
      }
    } catch (err) {
      toast.error("Error: Could not connect to server. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-lightBackground py-8">
      <div className="w-full max-w-md p-6 border rounded shadow-md bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={isLoading}
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              disabled={isLoading}
            />
          </div>

          {/* FIXED: Phone field with consistent naming */}
          <input
            type="text"
            name="phone_number" // ✅ Fixed: Changed from "phone" to "phone_number"
            placeholder="Phone Number"
            value={formData.phone_number} // ✅ Fixed: Changed from formData.phone to formData.phone_number
            onChange={handleChange}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={isLoading}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            />
          </div>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={isLoading}
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`py-2 rounded mt-2 font-semibold transition-colors ${
              isLoading
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;