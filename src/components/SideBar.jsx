import LOGO from "../assets/img/rak-logo.png";
import { TbLogout } from "react-icons/tb";
import { FaRegListAlt } from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
import { LiaUsersSolid } from "react-icons/lia";
import { GrStatusInfo } from "react-icons/gr";
import { LuUserPlus2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { RiProductHuntLine } from "react-icons/ri";

const SideBar = ({ page, setPage, handleStatus, userData }) => {
  const { userType } = userData;
  const navigate = useNavigate();
  return (
    <div className={`relative h-screen shadow-md border-r overflow-hidden`}>
      <div className="flex h-screen flex-col items-center justify-between p-4">
        <div className="w-full">
          <img src={LOGO} alt="logo" className="h-32 mb-4 m-4" />

          <div className="p-2">
            {userType === "Admin" && (
              <div
                className={`${
                  page === "customers" && "bg-gray-100"
                } flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer`}
                onClick={() => setPage("customers")}
              >
                <LiaUsersSolid /> Customers
              </div>
            )}

            {userType === "Customer" && (
              <div
                className={`${
                  page === "my-orders" && "bg-gray-100"
                } flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer`}
                onClick={() => {
                  setPage("my-orders"), handleStatus();
                }}
              >
                <FaRegListAlt /> My Orders
              </div>
            )}
            {userType === "Customer" && (
              <div
                className={`${
                  page === "order" && "bg-gray-100"
                } flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer`}
                onClick={() => {
                  setPage("order"), handleStatus();
                }}
              >
                <FaRegListAlt /> Create Order
              </div>
            )}
            {userType === "Admin" && (
              <div
                className={`${
                  page === "orders" && "bg-gray-100"
                } flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer`}
                onClick={() => setPage("orders")}
              >
                <FaRegListAlt /> Orders
              </div>
            )}

            {userType === "Admin" && (
              <div
                className={`${
                  page === "order-status" && "bg-gray-100"
                } flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer`}
                onClick={() => setPage("order-status")}
              >
                <GrStatusInfo /> Order Status
              </div>
            )}
          </div>
        </div>

        <div className="w-full px-2 border-t border-gray-300">
          <div className="py-2">
            {userType === "Admin" && (
              <div
                className={`${
                  page === "add-customer" && "bg-gray-100"
                } flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer`}
                onClick={() => setPage("add-customer")}
              >
                <LuUserPlus2 /> Add Customer
              </div>
            )}

            {userType === "Admin" && (
              <div
                className={`${
                  page === "add-product" && "bg-gray-100"
                } flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer`}
                onClick={() => setPage("add-product")}
              >
                <RiProductHuntLine /> Add Product
              </div>
            )}

            {/* <div className="flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer">
              <FaMoon /> Dark
            </div> */}
            {userType === "Admin" && (
              <div className="flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer">
                <TbReportAnalytics /> Report
              </div>
            )}

            <div
              className="flex flex-row items-center gap-4 text-xl hover:bg-gray-100 p-4 rounded-md cursor-pointer"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              <TbLogout /> Logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
