import axios from "axios";
import { Label, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BarLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Customers = ({ userData }) => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://raktherm-backend.vercel.app/api/customers")
      .then((res) => {
        setCustomerData(res.data), setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const refreshData = () => {
    setLoad(false);
    axios
      .get("https://raktherm-backend.vercel.app/api/customers")
      .then((res) => {
        setCustomerData(res.data), setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (id) => {
    axios
      .delete(`https://raktherm-backend.vercel.app/api/customers/${id}`)
      .then((res) => {
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
        refreshData();
      })
      .catch((err) => console.log(err));

    setLoad(true);
  };

  const [formData, setFormData] = useState({
    customerId: "",
    customerCode: "",
    customerName: "",
    location: "",
    contact: "",
  });

  const { customerId, customerCode, customerName, location, contact } =
    formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const getSpecificEmployee = (id) => {
    axios
      .post(`https://raktherm-backend.vercel.app/api/customers/${id}`)
      .then((res) => {
        setFormData({
          ...formData,
          customerId: id,
          customerCode: res?.data[0]?.customerCode,
          customerName: res?.data[0]?.customerName,
          location: res?.data[0]?.location,
          contact: res?.data[0]?.contact,
        });
        setShowModal(true);
      });
  };

  const handleSave = () => {
    axios
      .put(
        `https://raktherm-backend.vercel.app/api/customers/${customerId}`,
        formData
      )
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
          setShowModal(false);
          refreshData();
        }
      })
      .catch((err) => {
        toast.success(err.response.data.message, {
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
      <h1 className="text-4xl mb-4">Customer List</h1>

      {loading ? (
        <div className="h-[50vh] flex items-center justify-center">
          <BarLoader
            color="#e5e7eb"
            height={10}
            speedMultiplier={0.5}
            width={300}
          />
        </div>
      ) : (
        <>
          {customerData.length === 0 ? (
            <>
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Customer Code</Table.HeadCell>
                  <Table.HeadCell>Customer Name</Table.HeadCell>
                  <Table.HeadCell>Location</Table.HeadCell>
                  {/* <Table.HeadCell>Email</Table.HeadCell> */}
                  <Table.HeadCell>Contact No.</Table.HeadCell>
                  {userData.userType === "Coordinator" ? (
                    ""
                  ) : (
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  )}
                </Table.Head>
              </Table>
              <div className="h-[30vh] flex items-center justify-center w-full text-2xl">
                -- No data available --
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Customer Code</Table.HeadCell>
                  <Table.HeadCell>Customer Name</Table.HeadCell>
                  <Table.HeadCell>Location</Table.HeadCell>
                  {/* <Table.HeadCell>Email</Table.HeadCell> */}
                  <Table.HeadCell>Contact No.</Table.HeadCell>
                  {userData.userType === "Coordinator" ? (
                    ""
                  ) : (
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  )}
                </Table.Head>

                <Table.Body className="divide-y">
                  {customerData
                    .filter((item) => item.type === "customer")
                    .map((data) => (
                      <>
                        <Table.Row
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          key={data.customerCode}
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {data.customerCode}
                          </Table.Cell>
                          <Table.Cell> {data.customerName}</Table.Cell>
                          <Table.Cell> {data.location}</Table.Cell>
                          {/* <Table.Cell>
                            {" "}
                            {data.account.map((acc) => acc.email)}
                          </Table.Cell> */}
                          <Table.Cell> {data.contact}</Table.Cell>
                          {userData.userType === "Coordinator" ? (
                            ""
                          ) : (
                            <div className="flex items-center justify-center">
                              <Table.Cell
                                className="flex items-center gap-2 text-green-600 cursor-pointer "
                                onClick={() => {
                                  setShowModal(true);
                                  getSpecificEmployee(data._id);
                                }}
                              >
                                <>
                                  <FaEdit />
                                  Update Customer
                                </>
                              </Table.Cell>
                              <Table.Cell
                                className="flex items-center gap-2 text-red-600 cursor-pointer "
                                onClick={() => handleRemove(data._id)}
                              >
                                <>
                                  <FaTrashAlt />
                                  Remove
                                </>
                              </Table.Cell>
                            </div>
                          )}
                        </Table.Row>
                      </>
                    ))}
                </Table.Body>
              </Table>

              {load && (
                <div className="absolute w-full h-[85%] top-[15%] right-1/2 translate-x-1/2 bg-white/70">
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <ClipLoader color="green" size={50} />{" "}
                      <span className="text-4xl text-green-600">
                        Please wait . . .
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <Modal
            show={showModal}
            size="2xl"
            onClose={() => setShowModal(false)}
            popup
          >
            <Modal.Header>
              <div className="w-full py-2 px-4">Update Customer</div>
            </Modal.Header>
            <Modal.Body>
              <div className="grid grid-cols-1 p-10 gap-4 border-gray-300 border rounded-lg shadow-md">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="customerCode" value="Customer Code" />
                  </div>
                  <TextInput
                    id="customerCode"
                    type="text"
                    value={""}
                    placeholder={customerCode}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="customerName" value="Customer Name" />
                  </div>
                  <TextInput
                    id="customerName"
                    type="text"
                    value={customerName}
                    placeholder="Customer Name"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="location" value="Location" />
                  </div>
                  <TextInput
                    id="location"
                    type="text"
                    value={location}
                    placeholder="Location"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="contactNo" value="Contact No" />
                  </div>
                  <TextInput
                    id="contact"
                    type="text"
                    value={contact}
                    placeholder="Ex. +971587654321"
                    required
                    onChange={handleChange}
                  />
                </div>

                <div>&nbsp;</div>

                <div className="flex items-center justify-end">
                  <button
                    className="bg-gray-200 px-6 py-2 rounded-md border hover:bg-gray-100"
                    onClick={handleSave}
                  >
                    {loading ? (
                      <div className="flex flex-row items-center justify-center gap-2">
                        <ClipLoader color="black" size={20} /> Please wait . . .
                      </div>
                    ) : (
                      "SUBMIT"
                    )}
                  </button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default Customers;
