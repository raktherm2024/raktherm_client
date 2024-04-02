import React, { useState } from "react";
import LOGO from "../assets/img/rak-logo.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please input your email and password.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else {
      axios
        .post("http://localhost:5000/api/auth/login", { email, password })
        .then((res) => {
          navigate("/dashboard");
          localStorage.setItem("userDetails", JSON.stringify(res.data));
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setFormData({ ...formData, password: "" });
        });
    }
  };

  return (
    <div className="relative bg-screen bg-cover bg-center bg-no-repeat w-full h-screen flex items-center justify-center">
      <div className="absolute h-screen w-full bg-black/70">
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-[96%] xl:w-[30%] backdrop-blur-[1px] bg-white/30 border-white border rounded-lg shadow-md shadow-white/50 pt-10 px-16">
          <div className="flex text-center justify-center">
            <img src={LOGO} alt="logo" className="w-96" />
          </div>
          <p className="text-white/70 text-center font-semibold text-4xl pt-4">
            ONLINE SYSTEM
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center py-10 gap-4 px-8">
              <input
                type="email"
                placeholder="Email"
                className="rounded-sm h-10 px-4 w-full border-white border text-black/90 placeholder:text-white/70 bg-white/20 focus:outline-none"
                id="email"
                value={email}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-sm h-10 px-4 w-full border-white border text-black/90 placeholder:text-white/70 bg-white/20 focus:outline-none"
                id="password"
                value={password}
                onChange={handleChange}
              />

              <button className="bg-white/70 py-2 px-10 rounded-md text-black/70 font-medium mt-2">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
