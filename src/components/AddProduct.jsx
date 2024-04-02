import React, { useState } from "react";
import PPR from "./product/ppr/index.jsx";
import PEX from "./product/pex/index.jsx";

const AddProduct = () => {
  const [type, setType] = useState("ppr");

  const renderComponent = (type) => {
    switch (type) {
      case "ppr":
        return <PPR type={type} />;

      case "pex":
        return <PEX type={type} />;

      default:
        return <PPR type={type} />;
    }
  };
  return (
    <>
      <div className="relative h-full w-full border shadow-md p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl mb-4">Add Product</h1>

          <div className="flex flex-row items-center justify-start gap-2">
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
        </div>

        {renderComponent(type)}
      </div>
    </>
  );
};

export default AddProduct;
