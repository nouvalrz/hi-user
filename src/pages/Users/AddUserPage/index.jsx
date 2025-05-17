// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import useForm from "@/hooks/useForm";
import { useEffect } from "react";
import clsx from "clsx";
import Button from "@/components/Button";
import { useContext } from "react";
import { UsersContext } from "@/contexts/UsersContext";
import { User } from "lucide-react";
import { useNavigate } from "react-router";
import {
  userFormValidation,
  formValidationStep1,
} from "../userFormValidations";
import { FormStep1 } from "../FormStep1";
import { FormStep2 } from "../FormStep2";
import { CircleCheck } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";

const userInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
  phone: "",
  nationality: "",
  dob: "",
  role: "",
  employment_type: "",
  join_date: "",
  working_start: "",
  working_end: "",
  supervisor_name: "",
  salary_per_month: "",
};

function AddUserPage() {
  const totalSteps = 2;
  const navigate = useNavigate();
  const { addUser, getUsers } = useContext(UsersContext);

  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm(userInitialValues, userFormValidation);

  const handleAddUser = async () => {
    await addUser(form.values);
    navigate(-1);
  };

  const handleNextStep = () => {
    if (currentStep >= totalSteps) {
      return;
    }

    const errors = form.customValidate(formValidationStep1);

    if (Object.keys(errors).length === 0) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep <= 1) {
      return;
    }

    setCurrentStep((prev) => prev - 1);
  };

  useEffect(() => {
    getUsers(1); // make sure users data populated when user goes to this page directly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center mt-6  max-w-[600px] mx-auto">
      <div className="w-full">
        <Breadcrumbs />
        <h1 className="text-xl font-medium mt-4">Add Employee</h1>
        <p className="text-sm text-gray-500 mt-1">
          Create a new contract for employee
        </p>
      </div>
      <div className="flex mt-8 w-full max-w-[400px] items-center">
        <button
          className={clsx(
            "px-5 py-2 rounded-full border border-gray-300 text-xs cursor-pointer",
            { "border-sky-500": currentStep === 1 }
          )}
          onClick={handlePreviousStep}
        >
          1. Basic Information
        </button>
        <hr className="flex-1 border-gray-300" />
        <button
          className={clsx(
            "px-5 py-2 rounded-full border border-gray-300 text-xs cursor-pointer",
            { "border-sky-500": currentStep === 2 }
          )}
          onClick={handleNextStep}
        >
          2. Work Details
        </button>
      </div>

      <div className="mt-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <form onSubmit={form.handleSubmit(handleAddUser)}>
              {currentStep === 1 ? (
                <FormStep1 form={form} handleNextStep={handleNextStep} />
              ) : (
                <FormStep2
                  form={form}
                  handlePreviousStep={handlePreviousStep}
                />
              )}
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AddUserPage;
