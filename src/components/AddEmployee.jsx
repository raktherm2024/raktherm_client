import axios from "axios";
import { Label, Radio, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeCode: "",
    employeeName: "",
    location: "RAKtherm",
    type: "",
    email: "",
    password: "",
  });

  const { employeeCode, employeeName, location, type, email, password } =
    formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const clearData = () => {
    setFormData({
      ...formData,
      employeeCode: "",
      employeeName: "",
      type: "",
      email: "",
      password: "",
    });
  };

  const handleAddEmployee = async () => {
    if (
      !employeeCode ||
      !employeeName ||
      !location ||
      !type ||
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
        // .post("https://raktherm-backend.vercel.app/api/employee", formData)
        .post("https://raktherm-backend.vercel.app/api/employee", formData)
        .then(() => {
          toast.success("New employee has been added", {
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
      <h1 className="text-4xl mb-4">Add Employee</h1>

      <div className="grid grid-cols-2 p-10 gap-4 border-gray-300 border rounded-lg shadow-md">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="employeeCode" value="Employee Code" />
          </div>
          <TextInput
            id="employeeCode"
            type="text"
            value={employeeCode}
            placeholder="Employee Code"
            required
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="employeeName" value="Employee Name" />
          </div>
          <TextInput
            id="employeeName"
            type="text"
            value={employeeName}
            placeholder="Employee Name"
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
            onChange={handleChange}
            disabled
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="" value="Employee Type" />
          </div>

          <div className="flex items-center justify-start pt-3 gap-6">
            <div className="flex items-center gap-2">
              <Radio
                id="type"
                name="type"
                value="Admin"
                onClick={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <Label htmlFor="Admin">Admin</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="type"
                name="type"
                value="Coordinator"
                onClick={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <Label htmlFor="Coordinator">Coordinator</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="type"
                name="type"
                value="Salesman"
                onClick={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <Label htmlFor="Salesman">Salesman</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio
                id="type"
                name="type"
                value="Storekeeper"
                onClick={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <Label htmlFor="Storekeeper">Storekeeper</Label>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />{" "}
            <span className=" font-light italic">(use for login)</span>
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            placeholder="Ex. email@raktherm.com"
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
            onClick={handleAddEmployee}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
