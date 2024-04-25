import React, { useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import OrderList from "./OrderList";
import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { BsExclamationOctagon } from "react-icons/bs";
import ConfirmationMessage from "../ConfirmationMessage";
import PPR from "./ppr";
import PEX from "./pex";
import UPVC from "./upvc";
import RAKDUCT from "./rakduct";
import { BsBoxArrowInRight } from "react-icons/bs";
import {
  PEX_ADAPTERS,
  PEX_PIPES,
  PPR_FITTINGS,
  PPR_PIPES,
  UPVC_PIPES,
} from "./data";
import MessageModal from "./MessageModal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddOrder = ({ userData, status, setStatus, setPage }) => {
  const { userId } = userData;
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState("");
  const [orderNo, setOrderNo] = useState(
    "OR" +
      new Date().getFullYear() +
      Math.floor(100000 + Math.random() * 900000)
  );
  const [orderForm, setOrderForm] = useState(false);
  const [type, setType] = useState("ppr");

  const renderProps = {
    orderId,
    setOrderData,
  };

  const renderComponent = (type) => {
    switch (type) {
      case "ppr":
        return <PPR {...renderProps} />;

      case "pex":
        return <PEX {...renderProps} />;

      case "upvc":
        return <UPVC {...renderProps} />;

      case "rakduct":
        return <RAKDUCT {...renderProps} />;

      default:
        return <PPR {...renderProps} />;
    }
  };

  // Generate New OR #
  const generateNewOr = () => {
    setOrderNo(
      "OR" +
        new Date().getFullYear() +
        Math.floor(100000 + Math.random() * 900000)
    );
  };

  // Create / Get Order Details
  const handleCreateOrder = () => {
    setOrderForm(true);
    setOrderData("");

    axios
      .post("https://raktherm-backend.vercel.app/api/orders", {
        userId,
        orderNo,
      })
      .then((res) => {
        setOrderNo(res?.data?.orderNo),
          setOrderData(res?.data?.orders),
          setOrderId(res?.data?._id);
      })
      .catch((err) => console.log(err));
  };

  // Cancel Order
  const handleCancelOrder = (id) => {
    axios.delete(`https://raktherm-backend.vercel.app/api/orders/${id}`);
    setStatus("");
    setOrderForm(false);
    generateNewOr();
    setOrderData("");
    setOrderId("");
  };

  // Modal Properties
  const [openModal, setOpenModal] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);

  // Props
  const props = {
    userId,
    openMessage,
    setOpenMessage,
    message: "Are you sure you want to cancel this order?",
    handleCancelOrder,
    setStatus,
    setOrderForm,
    generateNewOr,
    setOrderData,
    setOrderId,
  };

  // ORDERS

  const [showMessage, setShowMessage] = useState(false);

  const handleSubmitOrder = () => {
    axios
      .post("https://raktherm-backend.vercel.app/api/orders/submit-order", {
        orderId,
        userId,
      })
      .then((res) => {
        if (res) {
          setOrderForm(false);
          toast.success("Order has been submitted successfully.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const modalProps = { showMessage, setShowMessage, handleSubmitOrder };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1
          className={`${
            orderForm
              ? "bg-green-300 cursor-not-allowed text-white"
              : "cursor-pointer bg-green-500 text-white hover:bg-white hover:border-2 hover:border-green-500 hover:text-black"
          } flex items-center gap-1 text-base  px-2 py-1 rounded-md border-2 border-white shadow-md `}
          onClick={orderForm ? () => {} : handleCreateOrder}
        >
          <IoCreateOutline size={20} className="mb-1" />
          Create New Order
        </h1>
        {orderForm && (
          <h1
            className="flex items-center gap-1 text-base bg-red-500 text-white px-2 py-1 rounded-md border-2 border-white shadow-md cursor-pointer hover:bg-white hover:border-2 hover:border-red-500 hover:text-black"
            onClick={() => setOpenMessage(true)}
          >
            <MdCancel size={20} />
            Cancel Order
          </h1>
        )}
      </div>

      <div className="relative h-full w-full border shadow-md">
        {!orderForm && <div className="absolute w-full h-full bg-glass z-50" />}
        <div className="p-4">
          <div className="flex flex-row items-center justify-start gap-2 mb-4">
            <div
              className={`w-28 py-1 rounded-md shadow-md  border-2 text-center  font-medium cursor-pointer hover:bg-green-500 hover:border-white hover:text-white ${
                type === "ppr"
                  ? "border-white bg-green-500 text-white"
                  : "border-green-500 bg-white text-green-500"
              }`}
              onClick={() => setType("ppr")}
            >
              PPR
            </div>
            <div
              className={`w-28 py-1 rounded-md shadow-md  border-2 text-center  font-medium cursor-pointer hover:bg-yellow-300 hover:border-white hover:text-white ${
                type === "pex"
                  ? "border-white bg-yellow-300 text-white"
                  : "border-yellow-300 bg-white text-yellow-300"
              }`}
              onClick={() => setType("pex")}
            >
              PEX
            </div>
            <div
              className={`w-28 py-1 rounded-md shadow-md  border-2 text-center  font-medium cursor-pointer hover:bg-orange-400 hover:border-white hover:text-white ${
                type === "upvc"
                  ? "border-white bg-orange-400 text-white"
                  : "border-orange-400 bg-white text-orange-400"
              }`}
              onClick={() => setType("upvc")}
            >
              UPVC
            </div>
            <div
              className={`w-28 py-1 rounded-md shadow-md  border-2 text-center  font-medium cursor-pointer hover:bg-blue-600/75 hover:border-white hover:text-white ${
                type === "rakduct"
                  ? "border-white bg-blue-600/75 text-white"
                  : "border-blue-600/75 bg-white text-blue-600/75"
              }`}
              onClick={() => setType("rakduct")}
            >
              DUCT
            </div>
          </div>

          {renderComponent(type)}

          <div className="flex items-center justify-between mb-3">
            <h1 className="text-2xl">
              Order #: <span className="font-medium">{orderNo}</span>
            </h1>

            <h1
              className="cursor-pointer bg-green-500 text-white hover:bg-white hover:border-2 hover:border-green-500 hover:text-black flex items-center gap-1 text-base  px-2 py-1 rounded-md border-2 border-white shadow-md"
              onClick={() => setShowMessage(true)}
            >
              <BsBoxArrowInRight size={20} className="mb-1" />
              Submit Order
            </h1>
          </div>
          <OrderList
            orderData={orderData}
            orderId={orderId}
            setOrderData={setOrderData}
          />
        </div>
      </div>

      <ConfirmationMessage {...props} />

      <MessageModal {...modalProps} />

      {/* MODAL */}
      {status === "Unfinished" && (
        <Modal
          show={openModal}
          size="lg"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <BsExclamationOctagon
                color="orange"
                className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
              />
              <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
                You still have unfinished order wish to continue it?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="success"
                  onClick={() => {
                    setOpenModal(false), handleCreateOrder();
                  }}
                >
                  {"Yes, I'll continue it."}
                </Button>
                <Button
                  color="failure"
                  onClick={() => {
                    setOpenModal(false),
                      handleCancelOrder(userId),
                      setOrderForm(false);
                  }}
                >
                  No, I start new order.
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default AddOrder;
