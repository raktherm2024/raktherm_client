import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import ItemName from "./ItemName";
import ItemCode from "./ItemCode";
import { toast } from "react-toastify";

const Pipes = ({ openPipes, setOpenPipes, setOpenFittings, type }) => {
  const [query, setQuery] = useState("");
  const [pipeData, setPipeData] = useState([]);

  const [data, setData] = useState({
    itemName: "",
    itemCode: "",
  });
  const [pexPipes, setPexPipes] = useState([]);

  const { itemName, itemCode } = data;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/pex-pipes")
      .then((res) => setPexPipes(res?.data));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all-pex-pipes")
      .then((res) => setPipeData(res?.data));
  }, [type]);

  const filter = () => {
    return pipeData.filter(
      (item) => item?.name?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const filterItemCode = pipeData?.filter((item) => item?.name === itemName);
  const [itemCodeOption, setItemCodeOption] = useState([]);

  useEffect(() => {
    setItemCodeOption(filterItemCode[0]?.items);
  }, [itemName]);

  const handleAddPipe = () => {
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
      .post("http://localhost:5000/api/products/pex-pipes", data)
      .then((res) => {
        if (res) {
          axios
            .get("http://localhost:5000/api/products/all-pex-pipes")
            .then((res) => setPipeData(res?.data));

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
      .post("http://localhost:5000/api/products/remove-pex-pipes", {
        itemName: name,
        itemCode: code,
      })
      .then((res) => {
        setPipeData(res?.data);
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
        className="flex items-center justify-between px-4 py-2 border-r-2 border-l-2 border-t-2 bg-yellow-300 text-white rounded-tr-lg rounded-tl-lg cursor-pointer"
        onClick={() => {
          setOpenPipes(!openPipes);
          setOpenFittings(false);
        }}
      >
        <h1 className="text-2xl">PIPES</h1>
        <MdOutlineKeyboardArrowDown
          className={`${
            openPipes
              ? "rotate-180 ease-linear duration-300"
              : "rotate-0 ease-linear duration-300"
          }`}
          size={20}
        />
      </div>
      <div
        className={`border-r-2 border-l-2 border-b-2 overflow-hidden ease-linear duration-200 ${
          openPipes ? "max-h-[600px] p-4" : "max-h-0"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <ItemName
            options={pexPipes}
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
            className="px-4 py-1 bg-yellow-300 border-2 border-yellow-300 rounded-md text-2xl text-white hover:border-yellow-300 hover:bg-white hover:text-black"
            onClick={handleAddPipe}
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
          {pipeData?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full text-2xl">
              -- No data available --
            </div>
          ) : (
            <>
              {filter()?.map((data, index) => (
                <div
                  className="flex flex-row text-sm border-b-gray-100 border-b hover:bg-gray-50"
                  key={index}
                >
                  {/* Item Name */}
                  <div className="w-full" key={data.name}>
                    {data?.items?.map((item) => (
                      <div
                        className="text-left py-3 px-6 text-xs text-[#6b7280] uppercase"
                        key={item.ItemCode}
                      >
                        {data.name}
                      </div>
                    ))}
                  </div>

                  {/* Item Code */}

                  <div className="w-full">
                    {data?.items?.map((item) => (
                      <div
                        className="text-left py-3 px-6 text-xs text-[#6b7280] uppercase"
                        key={item.itemCode}
                      >
                        {item.itemCode}
                      </div>
                    ))}
                  </div>

                  {/* OEM */}
                  <div className="w-1/2">
                    {data?.items?.map((item) => (
                      <div
                        className="flex items-center justify-end text-left py-3 px-6 text-xs text-[#6b7280] uppercase pr-10"
                        key={item.ItemCode}
                      >
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
