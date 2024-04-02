import { Select, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FITTINGS_OPTIONS, PPR_FITTINGS, PPR_PIPES } from "../data";
import axios from "axios";
import { toast } from "react-toastify";
import ItemName from "./ItemName";
import ItemCode from "./ItemCode";

const Fittings = ({ orderId, setOrderData }) => {
  const [data, setData] = useState({
    itemName: "",
    itemCode: "",
    quantity: "",
  });

  const { itemName, itemCode, quantity } = data;

  const filter = PPR_FITTINGS?.filter((item) => item?.name === itemName);

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`http://localhost:5000/api/orders/${orderId}`, {
        itemName: itemName,
        itemCode: itemCode,
        quantity: quantity,
        oem: "Pcs",
      })
      .then((res) => {
        setOrderData(res?.data?.orders),
          toast.success("Item has been added", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        setData({ ...data, itemCode: "", quantity: "" });
      })
      .catch((err) =>
        toast.error(err?.response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        })
      );
  };

  const [itemCodeOption, setItemCodeOption] = useState([]);

  useEffect(() => {
    setItemCodeOption(filter[0]?.items);
    setData({ ...data, itemCode: "" });
  }, [itemName]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-4 mb-3"
      >
        <ItemName
          options={FITTINGS_OPTIONS}
          label="name"
          id="itemName"
          selectedVal={itemName}
          handleChange={(val) => setData({ ...data, itemName: val })}
        />

        <ItemCode
          options={itemCodeOption}
          label="name"
          id="itemCode"
          selectedVal={itemCode}
          handleChange={(val) => setData({ ...data, itemCode: val })}
        />

        <TextInput
          id="quantity"
          type="number"
          className="w-full font-medium"
          placeholder="QUANTITY"
          required
          value={quantity}
          onChange={handleChange}
        />
        <TextInput
          className="w-[250px] border-none outline-none"
          value="Pcs"
          readOnly
        />
        <button
          type="submit"
          className="bg-green-500 text-white font-bold rounded-md py-1 px-4 text-2xl disabled:bg-gray-200"
        >
          +
        </button>
      </form>
    </>
  );
};

export default Fittings;
