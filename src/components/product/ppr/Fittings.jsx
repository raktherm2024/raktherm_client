import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import ItemName from "./ItemName";
import ItemCode from "./ItemCode";
import { toast } from "react-toastify";

const Pipes = ({ openFittings, setOpenFittings, setOpenPipes, type }) => {
  const [query, setQuery] = useState("");
  const [fittingsData, setFittingsData] = useState([]);

  const [data, setData] = useState({
    itemName: "",
    itemCode: "",
  });
  const [pprFittings, setPprFittings] = useState([]);

  const { itemName, itemCode } = data;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/ppr-fittings")
      .then((res) => setPprFittings(res?.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all-ppr-fittings")
      .then((res) => setFittingsData(res?.data));
  }, [type]);

  const filter = () => {
    return fittingsData.filter(
      (item) => item?.name?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const filterItemCode = fittingsData?.filter(
    (item) => item?.name === itemName
  );
  const [itemCodeOption, setItemCodeOption] = useState([]);

  useEffect(() => {
    setItemCodeOption(filterItemCode[0]?.items);
  }, [itemName]);

  const handleAddFittings = () => {
    if (!itemName && !itemCode) {
      return toast.error("All field is required!", {
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

    axios
      .post("http://localhost:5000/api/products/ppr-fittings", data)
      .then((res) => {
        if (res) {
          axios
            .get("http://localhost:5000/api/products/all-ppr-fittings")
            .then((res) => setFittingsData(res?.data));

          toast.success("New product has been added", {
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
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const handleRemovePipe = (name, code) => {
    axios
      .post("http://localhost:5000/api/products/remove-ppr-fittings", {
        itemName: name,
        itemCode: code,
      })
      .then((res) => {
        setFittingsData(res?.data);
        toast.success("Product has been removed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <div
        className="flex items-center justify-between px-4 py-2 border-r-2 border-l-2 border-t-2 bg-green-500 text-white rounded-tr-lg rounded-tl-lg cursor-pointer"
        onClick={() => {
          setOpenFittings(!openFittings);
          setOpenPipes(false);
        }}
      >
        <h1 className="text-2xl">FITTINGS</h1>
        <MdOutlineKeyboardArrowDown
          className={`${
            openFittings
              ? "rotate-180 ease-linear duration-300"
              : "rotate-0 ease-linear duration-300"
          }`}
          size={20}
        />
      </div>
      <div
        className={`border-r-2 border-l-2 border-b-2 overflow-hidden ease-linear duration-200 ${
          openFittings ? "max-h-[600px] p-4" : "max-h-0"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <ItemName
            options={pprFittings}
            label="name"
            id="itemName"
            selectedVal={itemName}
            handleChange={(val) => {
              setData({ ...data, itemName: val });
            }}
          />

          <ItemCode
            options={itemCodeOption}
            label="name"
            id="itemCode"
            selectedVal={itemCode}
            handleChange={(val) => setData({ ...data, itemCode: val })}
          />

          <button
            className="px-4 py-1 bg-green-500 border-2 border-green-500 rounded-md text-2xl text-white hover:border-green-500 hover:bg-white hover:text-black"
            onClick={handleAddFittings}
          >
            +
          </button>
        </div>

        <div className="flex items-center justify-between bg-gray-200/75 mt-4 p-2 px-4 border-b border-white">
          <h1 className="text-2xl pl-2 font-bold">PIPES LIST</h1>
          <input
            placeholder="Search Item Name"
            className="px-4 py-2 rounded-md border-2 focus:outline-none placeholder:text-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* Header */}
        <div className="flex flex-row text-sm border-b">
          {/* Item Code */}
          <div className="w-full">
            <div className="bg-gray-200/75 text-left py-3 px-6 font-bold uppercase text-[#374151]">
              item name
            </div>
          </div>

          {/* Item Name */}
          <div className="w-full">
            <div className="bg-gray-200/75 text-left py-3 px-6 font-bold uppercase text-[#374151]">
              item code
            </div>
          </div>

          {/* Action */}
          <div className="w-1/2">
            <div className="bg-gray-200/75 text-right py-3 px-6 font-bold uppercase text-[#374151]">
              action
            </div>
          </div>
        </div>
        {/* End */}
        <div className="h-[350px] max-h-[350px] overflow-auto">
          {fittingsData?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full text-2xl">
              -- No data available --
            </div>
          ) : (
            <>
              {filter()?.map((data, index) => (
                <div className="flex flex-row text-sm border-b-gray-100 border-b hover:bg-gray-50">
                  {/* Item Name */}
                  <div className="w-full">
                    {data?.items?.map((item) => (
                      <div className="text-left py-3 px-6 text-xs text-[#6b7280]">
                        {data.name}
                      </div>
                    ))}
                  </div>

                  {/* Item Code */}

                  <div className="w-full">
                    {data?.items?.map((item) => (
                      <div className="text-left py-3 px-6 text-xs text-[#6b7280]">
                        {item.itemCode}
                      </div>
                    ))}
                  </div>

                  {/* OEM */}
                  <div className="w-1/2">
                    {data?.items?.map((item) => (
                      <div className="flex items-center justify-end text-left py-3 px-6 text-xs text-[#6b7280] pr-10">
                        <TiDelete
                          size={16}
                          title="Remove"
                          color="red"
                          className="cursor-pointer"
                          onClick={() =>
                            handleRemovePipe(data.name, item.itemCode)
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Pipes;
