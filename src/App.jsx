import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [show, setShow] = useState(true);
  const props = { show, setShow };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {userData ? (
          <Route path="/dashboard" element={<Dashboard {...props} />} />
        ) : (
          <Route path="/*" element={<Login />} />
        )}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
      />
    </BrowserRouter>
  );
};

export default App;
