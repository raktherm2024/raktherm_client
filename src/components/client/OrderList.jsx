import axios from "axios";
import React, { useEffect, useRef } from "react";
import { TiDelete } from "react-icons/ti";
import { toast } from "react-toastify";

const OrderList = ({ orderData, orderId, setOrderData }) => {
  const handleRemoveItem = (id) => {
    axios
      .put(`http://localhost:5000/api/orders/remove/${orderId}`, {
        itemId: id,
      })
      .then((res) => {
        setOrderData(res?.data?.orders);
        if (res) {
          toast.success("Item has been removed from your order list.", {
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

  const ref = useRef();
  useEffect(() => {
    if (orderData.length) {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [orderData.length]);

  return (
    <div className="w-full shadow-md border">
      {/* Header */}

      <div className="flex flex-row text-sm border-b">
        {/* Item Name */}
        <div className="w-full">
          <div className="bg-gray-200/75 text-left py-3 px-6 font-bold uppercase text-[#374151]">
            item name
          </div>
        </div>

        {/* Item Code */}
        <div className="w-1/2">
          <div className="bg-gray-200/75 text-left py-3 px-6 font-bold uppercase text-[#374151]">
            item code
          </div>
        </div>

        {/* Quantity */}
        <div className="w-1/2">
          <div className="bg-gray-200/75 text-left py-3 px-6 font-bold uppercase text-[#374151]">
            quantity
          </div>
        </div>

        {/* OEM */}
        <div className="w-1/2">
          <div className="bg-gray-200/75 text-left py-3 px-6 font-bold uppercase text-[#374151]">
            oem
          </div>
        </div>

        {/* Action */}
        <div className="w-1/2">
          <div className="bg-gray-200/75 text-center py-3 px-6 font-bold uppercase text-[#374151]">
            action
          </div>
        </div>
      </div>
      {/* End */}

      {/* ******************************************************************************************** */}

      {/* Content */}
      <div className="h-[350px] max-h-[350px] overflow-auto">
        {orderData?.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-2xl">
            -- No data available --
          </div>
        ) : (
          <>
            {orderData?.map((data) => (
              <div
                className="flex flex-row text-sm border-b-gray-100 border-b hover:bg-gray-50"
                ref={ref}
              >
                {/* Item Name */}
                <div className="w-full">
                  <div className="text-left py-3 px-6 font-medium text-[#111827] uppercase">
                    {data.itemName}
                  </div>
                </div>

                {/* Item Code */}
                <div className="w-1/2">
                  <div className="text-left py-3 px-6 text-xs text-[#6b7280] uppercase">
                    {data.itemCode}
                  </div>
                </div>

                {/* Quantity */}
                <div className="w-1/2">
                  <div className="text-left py-3 px-6 text-xs text-[#6b7280] uppercase">
                    {data.quantity}
                  </div>
                </div>

                {/* OEM */}
                <div className="w-1/2">
                  <div className="text-left py-3 px-6 text-xs text-[#6b7280] uppercase">
                    {data.oem}
                  </div>
                </div>

                {/* Action */}
                <div className="w-1/2">
                  <div
                    className="flex items-center justify-center py-3 px-6 text-xs text-red-500 cursor-pointer"
                    onClick={() => handleRemoveItem(data._id)}
                  >
                    <TiDelete size={20} title="Remove" />
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {/* End */}
    </div>
  );
};

export default OrderList;
