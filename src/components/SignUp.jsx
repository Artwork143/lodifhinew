import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [firstName, setFirstName] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setFormData({
        ...formData,
        email: value,
        username: value, // Copy email value to username
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:3000/register', {firstName, lastName, email, password})
  //   .then(result => console.log(result))
  //   navigate('/login')
  //   .catch(err => console.log(err))
  // }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formData
      );
      console.log(response.data);
      navigate("/profile"); // Redirect to login page or another page
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md ">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-[100px]"
          // action="/register" method="POST"
          onSubmit={handleRegister}
        >
          <div className="flex gap-2 justify-evenly">
            <div className="input-group w-1/2">
              <input
                required
                className="border-[1.2px] border-gray-300 sm:text-sm"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label>Last Name</label>
            </div>

            <div className="input-group w-1/2">
              <input
                required
                className="border-[1.2px] border-gray-300 sm:text-sm"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label>First Name</label>
            </div>
          </div>

          <div className="input-group mt-0">
            <input
              required
              className={`border-[1.2px] border-gray-300 sm:text-sm ${
                formData.email.length > 0 &&
                `invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500`
              }`}
              type="email"
              name="email"
              value={formData.email && formData.username}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>

          <div className="input-group hidden">
            <input
              required
              className="border-[1.2px] border-gray-300 sm:text-sm"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              required
              className="border-[1.2px] border-gray-300 sm:text-sm"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <div className="flex items-center justify-between pb-3">
            <button
              className="bg-[#337CCF] hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
