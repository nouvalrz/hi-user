import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Input from "../components/Input";
import { useFetchData } from "../hooks/useFetchData";
import Dropdown from "../components/Dropdown";
import { employmentTypes, roles } from "../utils/populateUsers";

function AddUserPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="flex flex-col items-center mt-6">
      <h1 className="text-xl font-medium">Add Employee</h1>
      <p className="text-sm text-gray-500 mt-1">
        Create a new contract for employee
      </p>
      <div className="flex mt-8 w-full max-w-[400px] items-center">
        <button
          className="px-5 py-2 rounded-full border border-gray-300 text-xs cursor-pointer"
          onClick={() => setCurrentStep(1)}
        >
          1. Basic Information
        </button>
        <hr className="flex-1 border-gray-300" />
        <button
          className="px-5 py-2 rounded-full border border-gray-300 text-xs cursor-pointer"
          onClick={() => setCurrentStep(2)}
        >
          2. Work Details
        </button>
      </div>

      {/* AnimatePresence wrapper */}
      <div className="mt-6 w-full max-w-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 1 ? <FormStep1 /> : <FormStep2 />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function FormStep1() {
  const { data: countries, loading: countriesLoading } = useFetchData({
    endpoint: "https://api.first.org/data/v1/countries?limit=500",
  });

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs">Step 1</p>
        <h2 className="text-lg">Basic Information</h2>
        <hr className="border-gray-300" />
      </div>

      <Input label="First Name" name="first_name" placeholder="John" />
      <Input label="Last Name" name="last_name" placeholder="Doe" />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="example@mail.com"
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+621111118888"
      />
      {!countriesLoading && (
        <Dropdown
          placeholder="Select country ..."
          label="Nationality"
          options={Object.entries(countries.data).map((item) => ({
            name: item[1].country,
            value: item[1].country,
          }))}
        />
      )}
      <Input label="Date of Birth" name="dob" type="date" />
    </div>
  );
}

function FormStep2() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs">Step 2</p>
        <h2 className="text-lg">Work Details</h2>
        <hr className="border-gray-300" />
      </div>

      <Dropdown
        placeholder="Select role ..."
        label="Role"
        options={roles.map((item) => ({
          name: item,
          value: item,
        }))}
      />

      <Dropdown
        placeholder="Select type ..."
        label="Employment Type"
        options={employmentTypes.map((item) => ({
          name: item,
          value: item,
        }))}
      />

      <Input label="Join Date" name="join_date" type="date" />
      <div className="flex gap-3">
        <Input label="Working Start" name="working_start" type="time" />
        <Input label="Working End" name="working_end" type="time" />
      </div>
      <Input
        label="Supervisor Name"
        name="supervisor_name"
        placeholder="Anna Wang"
      />
      <Input
        label="Salary per Month"
        name="salary_per_month"
        type="number"
        placeholder="In USA Dollar"
      />
    </div>
  );
}

export default AddUserPage;
