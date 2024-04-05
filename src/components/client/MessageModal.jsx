import { Button, Modal } from "flowbite-react";
import React from "react";
import { BsExclamationOctagon } from "react-icons/bs";

const MessageModal = ({ showMessage, setShowMessage, handleSubmitOrder }) => {
  return (
    <Modal
      show={showMessage}
      size="lg"
      onClose={() => setShowMessage(false)}
      popup
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <BsExclamationOctagon
            color="orange"
            className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
          />
          <h3 className="mb-5 text-base font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to submit your orders now?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="success"
              onClick={() => {
                setShowMessage(false);
                handleSubmitOrder();
              }}
            >
              {"Yes, I'll submit now."}
            </Button>
            <Button color="failure" onClick={() => setShowMessage(false)}>
              No, I want to cancel.
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MessageModal;
