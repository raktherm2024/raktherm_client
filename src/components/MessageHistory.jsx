import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { BsTrash } from "react-icons/bs";

const MessageHistory = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/messages")
      .then((res) => setData(res.data));
  }, []);

  const handleClearHistory = () => {
    axios.delete("http://localhost:5000/api/messages").then((res) => {
      setData(res.data);
      toast.success("All message history has been cleared", {
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
      <div className="flex items-center justify-between">
        <h1 className="text-4xl mb-4">Message History</h1>

        <h1
          className={`${
            data.length == 0
              ? "bg-red-300 cursor-not-allowed text-white"
              : "cursor-pointer bg-red-500 text-white hover:bg-white hover:border-2 hover:border-green-500 hover:text-black"
          } flex items-center gap-1 text-base  px-2 py-1 rounded-md border-2 border-white shadow-md `}
          onClick={data.length == 0 ? () => {} : handleClearHistory}
        >
          <BsTrash size={20} className="mb-1" />
          Clear History
        </h1>
      </div>
      <div className="overflow-x-auto border border-gray-200">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>From (Sent By)</Table.HeadCell>
            <Table.HeadCell>To (Customer Name)</Table.HeadCell>
            <Table.HeadCell>Message</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((item) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={item._id}
              >
                <Table.Cell
                  className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                  valign="top"
                >
                  {item.sentFrom}
                </Table.Cell>
                <Table.Cell valign="top">{item.name}</Table.Cell>
                <Table.Cell valign="top">
                  <pre>{item.message}</pre>
                </Table.Cell>
                <Table.Cell valign="top">
                  {format(item.updatedAt, "MMM dd, yyyy")}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default MessageHistory;
