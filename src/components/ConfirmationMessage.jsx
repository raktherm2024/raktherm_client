import axios from "axios";
import { Button, Modal } from "flowbite-react";
import { BsExclamationOctagon } from "react-icons/bs";

const ConfirmationMessage = ({
  openMessage,
  setOpenMessage,
  message,
  userId,
  setStatus,
  setOrderForm,
  generateNewOr,
  setOrderData,
  setOrderId,
}) => {
  const handleCancel = (id) => {
    axios.delete(`http://localhost:5000/api/orders/${id}`);
    setStatus("");
    setOrderForm(false);
    generateNewOr();
    setOrderData("");
    setOrderId("");
    setOpenMessage(false);
  };

  return (
    <Modal
      show={openMessage}
      size="md"
      onClose={() => setOpenMessage(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <BsExclamationOctagon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => handleCancel(userId)}>
              {"Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenMessage(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationMessage;
