import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { BarLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);

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

  console.log(customerData);

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
                  <Table.HeadCell>Employee Code</Table.HeadCell>
                  <Table.HeadCell>Employee Name</Table.HeadCell>
                  <Table.HeadCell>Location</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Employee Type</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
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
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Contact No.</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
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
                          <Table.Cell>
                            {" "}
                            {data.account.map((acc) => acc.email)}
                          </Table.Cell>
                          <Table.Cell> {data.contact}</Table.Cell>
                          <Table.Cell
                            className="flex items-center gap-2 text-red-600 cursor-pointer "
                            onClick={() => handleRemove(data._id)}
                          >
                            <>
                              <FaTrashAlt />
                              Remove
                            </>
                          </Table.Cell>
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
        </>
      )}
    </>
  );
};

export default Customers;
