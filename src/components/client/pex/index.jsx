import React from "react";
import Pipes from "./Pipes";
import Adapters from "./Adapters";

const index = ({ orderId, setOrderData }) => {
  const renderProps = {
    orderId,
    setOrderData,
  };
  return (
    <>
      <div className="animate__animated animate__fadeIn">
        <h1 className="text-2xl">Pipes</h1>
        <Pipes {...renderProps} />
        <hr className="my-4" />
        <h1 className="text-2xl">Adapters</h1>
        <Adapters {...renderProps} />
        <hr className="my-4" />
      </div>
    </>
  );
};

export default index;
