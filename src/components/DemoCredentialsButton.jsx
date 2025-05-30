import { Key } from "lucide-react";
import React, { useState } from "react";
import Modal from "./Modal";
import Button from "./Button";

const DemoCredentialsButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  return (
    <>
      <button
        className="bg-sky-600 text-white rounded-full px-5 py-3 fixed bottom-4 right-4 shadow text-sm animate-bounce cursor-pointer flex gap-1"
        onClick={toggleModal}
      >
        <Key className="size-5" />
        Demo Credentials
      </button>
      <Modal title="Demo Credentials" isOpen={modalOpen} onClose={toggleModal}>
        <div className="mt-4">
          <p className="text-sm">
            Due to limitation from{" "}
            <a href="https://reqres.in" target="blank" className="underline">
              Reqres API
            </a>
            , you can only register and login with predefined account. Please
            use this account.
          </p>

          <ul className="text-sm mt-4">
            <li>
              Email : <span className="font-medium">eve.holt@reqres.in</span>
            </li>
            <li>
              Password : <span className="font-medium">cityslicka</span>
            </li>
          </ul>

          <Button className="ml-auto mt-4" onClick={toggleModal}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DemoCredentialsButton;
