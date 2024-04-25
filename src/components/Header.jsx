import React from "react";
import { Avatar } from "flowbite-react";
import { RiMenuFoldLine, RiMenuUnfoldFill } from "react-icons/ri";
import LOGO from "../assets/img/rak-logo.png";

const Header = ({ show, setShow, userData }) => {
  console.log(userData);
  return (
    <div className="flex flex-row items-center justify-between bg-gray-200 p-4">
      <div>
        <button onClick={() => setShow(!show)}>
          {show ? <RiMenuFoldLine size={40} /> : <RiMenuUnfoldFill size={40} />}
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <p className="font-bold text-base">
            {userData.customerCode} - {userData.customerName}
          </p>
          <p className="text-right">{userData.userType}</p>
        </div>
        <img
          src={LOGO}
          className="w-40 h-18 border-2 border-gray-500 rounded-lg p-1"
        />
      </div>
    </div>
  );
};

export default Header;
