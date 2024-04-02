import axios from "axios";
import { Table } from "flowbite-react";
import { FaRegEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

const MyOrders = ({ setPage }) => {
  return (
    <>
      <h1 className="text-4xl mb-4">My Orders</h1>

      <div className="overflow-x-auto border border-gray-200">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Order #</Table.HeadCell>
            <Table.HeadCell>status</Table.HeadCell>
            <Table.HeadCell>actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                asfas
              </Table.Cell>
              <Table.Cell> asfasd</Table.Cell>
              <Table.Cell className="flex flex-row items-center gap-6">
                <div
                  className="flex flex-row items-center gap-2 text-blue-500 cursor-pointer"
                  onClick={() => setPage("order")}
                >
                  <FaRegEdit /> Continue
                </div>
                |
                <div className="flex flex-row items-center gap-2 text-blue-500 cursor-pointer">
                  <FaMagnifyingGlass /> View Details
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default MyOrders;
