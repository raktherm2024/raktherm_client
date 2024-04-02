import React from "react";
import { Avatar } from "flowbite-react";
import { RiMenuFoldLine, RiMenuUnfoldFill } from "react-icons/ri";

const Header = ({ show, setShow, userData }) => {
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
        <Avatar img="https://www.flowbite-react.com/images/people/profile-picture-5.jpg" />
      </div>
    </div>
  );
};

export default Header;
