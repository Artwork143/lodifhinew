import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [border, setBorder] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios
  //     .post("http://localhost:3000/login", { email, password })
  //     .then((result) => {
  //       console.log(result);
  //       if (result.data === "Success") {
  //         navigate("/profile");
  //       } else {
  //         setBorder(true);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password,
      });
      console.log(response.data);
      if (response.data === "Success") {
        navigate("/profile");
      } else {
        setBorder(true);
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };


  // const correctEmail = "Email@com";
  // const correctPass = "Password";

  // const [border, setBorder] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add your login logic here
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   if (correctEmail !== email && correctPass !== password) {
  //     setBorder(true);
  //     console.log(border);
  //   }
  // };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md ">
        <div
          className={`${
            border ? `opacity-100` : ` translate-x-full opacity-0`
          } shadow-md mb-5 flex transition-all duration-500 bg-red-200 border py-2 border-red-500 items-center flex-col text-gray-950 text-opacity-80`}
        >
          <p className="font-bold">Wrong Credentials</p>
          <p>Invalid username or password</p>
        </div>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-[100px]"
          onSubmit={handleSubmit}
        >
          <div className="input-group">
            <input
              required
              className={`border-[1.2px] border-gray-300 sm:text-sm ${
                email.length > 0 &&
                `invalid:border-red-500 invalid:text-red-600 focus:invalid:border-red-500`
              }`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              required
              className="border-[1.2px] border-gray-300 sm:text-sm"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <div className="flex items-center justify-between pb-3">
            <button
              className="bg-[#337CCF] hover:bg-blue-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
{/*         <NavLink to="/profile" className="hover:text-red-900">Profile</NavLink> */}
      </div>
    </div>
  );
};

export default LoginForm;
