import React from "react";

import Header from "./Header";
import Customers from "./Customers";
import Orders from "./Orders";
import OrderStatus from "./OrderStatus";
import AddCustomer from "./AddCustomer";
import AddProduct from "./AddProduct";
import AddOrder from "./client/AddOrder";
import MyOrders from "./client/MyOrders";
import MessageCustomer from "./MessageCustomer";
import MessageHistory from "./MessageHistory";
import AddEmployee from "./AddEmployee";
import Employee from "./Employee";

const Content = ({
  show,
  setShow,
  page,
  userData,
  status,
  setStatus,
  setPage,
}) => {
  const props = { show, setShow, page, userData, status, setStatus, setPage };

  const renderComponent = (component) => {
    switch (component) {
      case "customers":
        return <Customers {...props} />;

      case "employee":
        return <Employee {...props} />;

      case "order":
        return <AddOrder {...props} />;

      case "my-orders":
        return <MyOrders {...props} />;

      case "orders":
        return <Orders {...props} />;

      case "order-status":
        return <OrderStatus {...props} />;

      case "add-employee":
        return <AddEmployee {...props} />;

      case "add-customer":
        return <AddCustomer {...props} />;

      case "add-product":
        return <AddProduct {...props} />;

      case "message-customer":
        return <MessageCustomer {...props} />;

      case "message-history":
        return <MessageHistory {...props} />;
    }
  };

  return (
    <>
      <Header {...props} />
      <div className="p-4">{renderComponent(page)}</div>
    </>
  );
};

export default Content;
