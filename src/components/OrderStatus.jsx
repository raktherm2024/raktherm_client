import { Table } from "flowbite-react";
import { RxUpdate } from "react-icons/rx";

const OrderStatus = () => {
  return (
    <>
      <h1 className="text-4xl mb-4">Order Status</h1>
      <div className="overflow-x-auto border border-gray-200">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell>order no</Table.HeadCell>
            <Table.HeadCell>Customer code</Table.HeadCell>
            <Table.HeadCell>customer name</Table.HeadCell>
            <Table.HeadCell>date</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                OR123
              </Table.Cell>
              <Table.Cell> ABC123</Table.Cell>
              <Table.Cell> Moiz Trading Co. B.S.C.</Table.Cell>
              <Table.Cell>14/02/2024</Table.Cell>
              <Table.Cell>Out For Delivery</Table.Cell>
              <Table.Cell className="flex items-center gap-2 text-blue-500 cursor-pointer">
                <RxUpdate /> Update Status
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                OR123
              </Table.Cell>
              <Table.Cell> ABC123</Table.Cell>
              <Table.Cell> Moiz Trading Co. B.S.C.</Table.Cell>
              <Table.Cell>14/02/2024</Table.Cell>
              <Table.Cell>Pending</Table.Cell>
              <Table.Cell className="flex items-center gap-2 text-blue-500 cursor-pointer">
                <RxUpdate /> Update Status
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                OR123
              </Table.Cell>
              <Table.Cell> ABC123</Table.Cell>
              <Table.Cell> Moiz Trading Co. B.S.C.</Table.Cell>
              <Table.Cell>14/02/2024</Table.Cell>
              <Table.Cell>Pending</Table.Cell>
              <Table.Cell className="flex items-center gap-2 text-blue-500 cursor-pointer">
                <RxUpdate /> Update Status
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                OR123
              </Table.Cell>
              <Table.Cell> ABC123</Table.Cell>
              <Table.Cell> Moiz Trading Co. B.S.C.</Table.Cell>
              <Table.Cell>14/02/2024</Table.Cell>
              <Table.Cell>Pending</Table.Cell>
              <Table.Cell className="flex items-center gap-2 text-blue-500 cursor-pointer">
                <RxUpdate /> Update Status
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default OrderStatus;
