import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    customerCode: "",
    customerName: "",
    location: "",
    contact: "",
    email: "",
    password: "",
  });

  const { customerCode, customerName, location, contact, email, password } =
    formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const clearData = () => {
    setFormData({
      ...formData,
      customerCode: "",
      customerName: "",
      location: "",
      contact: "",
      email: "",
      password: "",
    });
  };

  const handleAddCustomer = async () => {
    if (
      !customerCode ||
      !customerName ||
      !location ||
      !contact ||
      !email ||
      !password
    ) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    } else {
      axios
        .post("https://raktherm-backend.vercel.app/api/customers", formData)
        .then(() => {
          toast.success("New customer has been added", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          }),
            clearData();
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
    }
  };

  return (
    <div>
      <h1 className="text-4xl mb-4">Add Customer</h1>

      <div className="grid grid-cols-2 p-10 gap-4 border-gray-300 border rounded-lg shadow-md">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="customerCode" value="Customer Code" />
          </div>
          <TextInput
            id="customerCode"
            type="text"
            value={customerCode}
            placeholder="Customer Code"
            required
            onChange={handleChange}
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

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            placeholder="Ex. email@company.com"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>

        <div>&nbsp;</div>

        <div className="flex items-center justify-end">
          <button
            className="bg-gray-200 px-6 py-2 rounded-md border hover:bg-gray-100"
            onClick={handleAddCustomer}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
