import axios from "axios";
import { Label, Modal, Radio, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { ImEye, ImEyeBlocked } from "react-icons/im";
import { BarLoader, ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const Employee = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("https://raktherm-backend.vercel.app/api/employee")
      .then((res) => {
        setEmployeeData(res.data), setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const refreshData = () => {
    setLoad(false);
    axios
      .get("https://raktherm-backend.vercel.app/api/employee")
      .then((res) => {
        setEmployeeData(res.data), setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (id) => {
    axios
      .delete(`https://raktherm-backend.vercel.app/api/employee/${id}`)
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

  // Update Employee
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeCode: "",
    employeeName: "",
    location: "RAKtherm",
    type: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState();

  const {
    employeeId,
    employeeCode,
    employeeName,
    location,
    type,
    email,
    password,
  } = formData;

  const getSpecificEmployee = (id) => {
    axios
      .post(`https://raktherm-backend.vercel.app/api/employee/${id}`)
      .then((res) => {
        setFormData({
          ...formData,
          employeeId: id,
          employeeCode: res?.data[0]?.employeeCode,
          employeeName: res?.data[0]?.employeeName,
          location: "RAKtherm",
          type: res?.data[0]?.type,
          email: res?.data[0]?.account[0]?.email,
          password: res?.data[0]?.account[0]?.password,
        });
        setShowModal(true);
      });
  };

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

  const handleSave = () => {
    axios
      .put(
        `https://raktherm-backend.vercel.app/api/employee/${employeeId}`,
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
      <h1 className="text-4xl mb-4">Employee List</h1>

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
        <div className="overflow-x-auto border border-gray-200 shadow-md">
          {employeeData.length === 0 ? (
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
            <>
              <div className="relative w-full h-full">
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
                  <Table.Body className="divide-y">
                    {employeeData.map((data) => (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={data.employeeCode}
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.employeeCode}
                        </Table.Cell>
                        <Table.Cell> {data.employeeName}</Table.Cell>
                        <Table.Cell> {data.location}</Table.Cell>
                        <Table.Cell>
                          {" "}
                          {data.account.map((acc) => acc.email)}
                        </Table.Cell>
                        <Table.Cell> {data.type}</Table.Cell>
                        <div
                          className="flex items-center justify-between"
                          key={data.employeeCode}
                        >
                          {data.type === "Admin" ? (
                            <Table.Cell className="flex items-center gap-2 text-green-500 cursor-pointer">
                              &nbsp;
                            </Table.Cell>
                          ) : (
                            <Table.Cell
                              className="flex items-center gap-2 text-green-500 cursor-pointer"
                              onClick={() => {
                                getSpecificEmployee(data._id);
                              }}
                            >
                              <FaEdit /> Change Employee Type
                            </Table.Cell>
                          )}

                          {data.type === "Admin" ? (
                            <Table.Cell className="flex items-center gap-2 text-green-500 cursor-pointer">
                              &nbsp;
                            </Table.Cell>
                          ) : (
                            <Table.Cell
                              className="flex items-center gap-2 text-red-500 cursor-pointer"
                              onClick={() => handleRemove(data._id)}
                            >
                              <FaTrashAlt /> Remove
                            </Table.Cell>
                          )}
                        </div>
                      </Table.Row>
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
            </>
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
          <div className="w-full py-2 px-4">Update Employee</div>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 border-t-2 gap-3 border-gray-300/80">
            <div>
              <div className="mb-2 block mt-4">
                <Label htmlFor="employeeCode" value="Employee Code" />
              </div>
              <TextInput
                id="employeeCode"
                type="text"
                value={employeeCode}
                disabled
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
                disabled
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

              <div className="flex items-center justify-start gap-6 mt-1">
                <div className="flex items-center gap-2">
                  <Radio
                    id="type"
                    name="type"
                    onChange={() => {}}
                    value="Admin"
                    onClick={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    checked={type === "Admin" ? true : false}
                  />
                  <Label htmlFor="Admin">Admin</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="type"
                    name="type"
                    onChange={() => {}}
                    value="Coordinator"
                    onClick={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    checked={type === "Coordinator" ? true : false}
                  />
                  <Label htmlFor="Coordinator">Coordinator</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="type"
                    name="type"
                    onChange={() => {}}
                    value="Salesman"
                    onClick={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    checked={type === "Salesman" ? true : false}
                  />
                  <Label htmlFor="Salesman">Salesman</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Radio
                    id="type"
                    name="type"
                    onChange={() => {}}
                    value="Storekeeper"
                    onClick={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    checked={type === "Storekeeper" ? true : false}
                  />
                  <Label htmlFor="Storekeeper">Storekeeper</Label>
                </div>
              </div>
            </div>

            <div className="mt-1">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                value={email}
                placeholder="Ex. email@raktherm.com"
                onChange={handleChange}
                disabled
              />
            </div>

            <div className="block">
              <Label htmlFor="email" value="Password" />
            </div>
            <div className="relative w-full flex items-center justify-between border-white border bg-white/20">
              <TextInput
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Password"
                id="password"
                disabled
                value={password}
                onChange={handleChange}
                className="w-full"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0"
              >
                {showPassword ? (
                  <ImEye
                    size={20}
                    className="mx-4 text-black/90 cursor-pointer"
                  />
                ) : (
                  <ImEyeBlocked
                    size={20}
                    className="mx-4 text-black/90 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div>&nbsp;</div>

            <div className="flex items-center justify-end">
              <button
                className="text-white bg-green-400 px-6 py-2 rounded-md border hover:bg-green-500"
                onClick={() => handleSave()}
              >
                Save
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Employee;
