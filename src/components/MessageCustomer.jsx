import axios from "axios";
import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { FaMobileAlt } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import BarLoader from "react-spinners/BarLoader";
import { toast } from "react-toastify";

const MessageCustomer = ({ userData }) => {
  const [customerData, setCustomerData] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [contactList, setContactList] = useState([]);

  const [templates, setTemplates] = useState([]);

  const [templateData, setTemplateData] = useState({
    title: "",
    message: "",
  });

  const { title, message } = templateData;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/customers")
      .then((res) => {
        setCustomerData(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/templates")
      .then((res) => {
        setTemplates(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const refreshData = () => {
    axios
      .get("http://localhost:5000/api/templates")
      .then((res) => {
        setTemplates(res.data);
      })
      .catch((err) => console.log(err));
  };

  const filteredArr = customerList.filter(
    (v, i, a) => a.findIndex((v2) => v2.name === v.name) === i
  );

  const removeItem = (index) => {
    setCustomerList([
      ...customerList.slice(0, index),
      ...customerList.slice(index + 1),
    ]);

    setContactList([
      ...contactList.slice(0, index),
      ...contactList.slice(index + 1),
    ]);
  };

  const handleSaveTemplate = () => {
    axios
      .post("http://localhost:5000/api/templates/", templateData)
      .then((res) => {
        setShowModal(false);
        refreshData();
      });
  };

  const handleDeleteTemplate = (id) => {
    axios.delete(`http://localhost:5000/api/templates/${id}`).then((res) => {
      console.log(res);
      if (res) {
        setMessageContent("");
        refreshData();
      }
    });
  };

  const filterCustomers = (customerData) => {
    return customerData?.filter(
      (item) =>
        item?.customerName?.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        item?.contact?.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  const handleTxtMessage = () => {
    axios
      .post("http://localhost:5000/api/messages/send", {
        contactList,
        messageContent,
      })
      .then((res) => {
        if (res) {
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setLoading(false);
        }
      });
  };

  const handleSendNow = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/api/messages/", {
        customerList,
        messageContent,
        sentFrom: userData.customerName,
      })
      .then((res) => {
        if (res) {
          handleTxtMessage();
          setMessageContent([]);
          setCustomerList([]);
        }
      });
  };

  return (
    <>
      <div className="p-4 shadow-md">
        <h1 className="text-4xl mb-4 text-center">Message a Customer</h1>

        <div className="w-full  flex flex-row">
          <div className="flex flex-1 flex-col border-2 rounded-tl-lg rounded-bl-lg border-r-0">
            <div className="w-full bg-green-500 p-4">
              <p className="font-semibold text-white text-xl">Send Message</p>
            </div>
            <div className="p-4">
              <p className="font-bold text-lg mb-4">Recepient:</p>
              <div className="flex flex-wrap gap-4 p-4 border-2 h-40 rounded-md shadow-md">
                {filteredArr.map((data, index) => (
                  <div className="relative flex flex-col justify-center h-16 border-2 border-green-500 p-2 rounded-md shadow-md">
                    <div className="font-bold">{data.name}</div>
                    <div className="flex flex-row items-center">
                      <FaMobileAlt />
                      <p className="pt-[2px]">{data.contact}</p>
                    </div>

                    <div
                      className="absolute -top-3 -right-3 bg-red-500 cursor-pointer p-1 rounded-full"
                      onClick={() => removeItem(index)}
                    >
                      <FaTimesCircle size={16} color={"white"} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-4">
              <div className="flex items-end justify-between">
                <p className="font-bold text-lg">Message:</p>
                <button
                  className="float-right bg-green-500 text-white border-2 px-2 py-1 rounded-md shadow-md font-bold flex items-center gap-1 text-base hover:bg-white hover:border-green-500 hover:text-green-500"
                  onClick={() => setShowTemplate(!showTemplate)}
                >
                  <IoMdArrowDropdown
                    size={18}
                    className={`${
                      showTemplate ? "rotate-180" : "rotate-0"
                    }  transition-all ease-in-out`}
                  />
                  Templates
                </button>
              </div>

              <div
                className={`${
                  showTemplate ? "max-h-32 border-2 p-4 flex" : "max-h-0 h-0"
                }  transition-all ease-in duration-100  my-2 overflow-auto  flex-wrap`}
              >
                <div className="w-full flex flex-col">
                  <div className="flex flex-row items-center gap-2 border-b-2 pb-2">
                    <p className="font-bold text-lg">Add Template:</p>
                    <button
                      className=" bg-green-500 text-white border-2 px-2 rounded-md shadow-md font-bold text-base hover:bg-white hover:border-green-500 hover:text-black"
                      onClick={() => setShowModal(true)}
                    >
                      +
                    </button>
                  </div>
                  <div className=" pt-2 flex flex-wrap gap-2">
                    {templates?.map((data) => (
                      <>
                        <button
                          className="relative bg-green-500 text-white border-2 px-2 py-1 rounded-md shadow-md font-medium flex items-center gap-1 text-base uppercase"
                          onClick={() => setMessageContent(data.message)}
                        >
                          {data.title}

                          <div
                            className="absolute -top-2 -right-2 bg-red-500 cursor-pointer p-1 rounded-full"
                            onClick={() => handleDeleteTemplate(data._id)}
                          >
                            <FaRegTrashCan size={12} color={"white"} />
                          </div>
                        </button>
                      </>
                    ))}
                  </div>
                </div>
              </div>

              <textarea
                className="w-full border-2 border-[#e5e7eb] focus:border-green-500 rounded-md shadow-md"
                placeholder="Your message here...."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                rows={8}
              />
            </div>

            <div className="px-4 mb-4 flex items-center justify-between">
              <button
                className="bg-red-500 text-white border-2 px-4 py-2 rounded-md shadow-md font-bold uppercase flex items-center gap-1 text-base hover:bg-white hover:border-red-500 hover:text-red-500"
                onClick={() => setMessageContent("")}
              >
                Clear
              </button>
              <button
                className={`bg-green-500 text-white border-2 px-4 py-2 rounded-md shadow-md font-bold uppercase flex items-center gap-1 text-base ${
                  loading
                    ? "cursor-not-allowed"
                    : "hover:bg-white hover:border-green-500 hover:text-green-500"
                }`}
                onClick={handleSendNow}
              >
                {loading ? (
                  <BarLoader
                    color="#fff"
                    height={8}
                    width={100}
                    className="my-2"
                  />
                ) : (
                  <>
                    <FiSend size={18} /> Send Now
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col border-2 rounded-tr-lg rounded-br-lg">
            <div className="w-full bg-green-500 p-4">
              <p className="font-semibold text-white text-xl">Customer List</p>
            </div>
            <div className="flex items-center border-b">
              <div className=" h-full flex items-center">
                <CiSearch size={30} className="pl-2" />
              </div>
              <input
                placeholder="Search"
                className="py-2 px-1 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-4 p-4">
              {filterCustomers(customerData).map((data) =>
                data.customerCode === "RAK123" ? (
                  ""
                ) : (
                  <div
                    className="relative flex flex-col justify-center h-16 cursor-pointer border-2 border-green-500 p-2 rounded-md shadow-md"
                    onClick={() => {
                      setCustomerList([
                        ...customerList,
                        { name: data.customerName, contact: data.contact },
                      ]);

                      setContactList([...contactList, data.contact]);
                    }}
                  >
                    <div className="font-bold">{data.customerName}</div>
                    <div className="flex flex-row items-center">
                      <FaMobileAlt />
                      <p className="pt-[2px]">{data.contact}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <Modal
          show={showModal}
          size="md"
          onClose={() => setShowModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 border-b-2 pb-2">
                Add Template
              </h3>
              <div className="flex flex-col gap-2 mb-4">
                <input
                  type="text"
                  className="border-2 focus:border-green-500 border-[#e5e7eb] rounded-md"
                  placeholder="Title"
                  value={title}
                  onChange={(e) =>
                    setTemplateData({ ...templateData, title: e.target.value })
                  }
                />
                <textarea
                  className="border-2 focus:border-green-500 border-[#e5e7eb] rounded-md"
                  placeholder="Message"
                  value={message}
                  rows={5}
                  onChange={(e) =>
                    setTemplateData({
                      ...templateData,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-center gap-4">
                <Button
                  color="success"
                  className="w-40"
                  onClick={() => handleSaveTemplate()}
                >
                  Save Template
                </Button>
                <Button
                  color="failure"
                  className="w-40"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default MessageCustomer;
