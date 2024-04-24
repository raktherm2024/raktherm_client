import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar.jsx";
import Content from "../components/Content.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ show, setShow }) => {
  const [userData, setUserData] = useState([]);
  const [status, setStatus] = useState("");
  const [page, setPage] = useState("");
  const navigate = useNavigate();

  const handleStatus = () => {
    axios
      .get(`https://raktherm-backend.vercel.app/api/orders/${userData?.userId}`)
      .then((res) => setStatus(res?.data?.status));
  };

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  const props = { show, setShow, setPage, userData, status, setStatus };

  return (
    <div className="w-full h-screen">
      <div className="flex flex-row">
        <div
          className={`${show ? "w-[500px]" : "w-0"} ease-in-out duration-300`}
        >
          <SideBar
            {...props}
            page={page}
            setPage={setPage}
            handleStatus={handleStatus}
          />
        </div>

        <div className="w-full">
          <Content {...props} page={page} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
