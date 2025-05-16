import { useContext } from "react";
import { UsersContext } from "@/contexts/UsersContext";
import { roles, employmentTypes } from "@/utils/populateUsers";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";

export function FormStep2({ form, handlePreviousStep }) {
  const { values, handleChange, errors } = form;
  const { loading } = useContext(UsersContext);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs">Step 2</p>
        <h2 className="text-lg">Work Details</h2>
        <hr className="border-gray-300" />
      </div>

      <Dropdown
        name="role"
        placeholder="Select role ..."
        label="Role"
        options={roles.map((item) => ({
          name: item,
          value: item,
        }))}
        value={values.role}
        onSelectedChange={handleChange}
        errorMessage={errors.role}
      />

      <Dropdown
        name="employment_type"
        placeholder="Select type ..."
        label="Employment Type"
        options={employmentTypes.map((item) => ({
          name: item,
          value: item,
        }))}
        value={values.employment_type}
        onSelectedChange={handleChange}
        errorMessage={errors.employment_type}
      />

      <Input
        label="Join Date"
        name="join_date"
        type="date"
        value={values.join_date}
        onChange={handleChange}
        errorMessage={errors.join_date}
      />
      <div className="flex gap-3">
        <Input
          label="Working Start (UTC +0)"
          name="working_start"
          type="time"
          value={values.working_start}
          onChange={handleChange}
          errorMessage={errors.working_start}
        />
        <Input
          label="Working End  (UTC +0)"
          name="working_end"
          type="time"
          value={values.working_end}
          onChange={handleChange}
          errorMessage={errors.working_end}
        />
      </div>
      <Input
        label="Supervisor Name"
        name="supervisor_name"
        placeholder="Anna Wang"
        value={values.supervisor_name}
        onChange={handleChange}
        errorMessage={errors.supervisor_name}
      />
      <Input
        value={values.salary_per_month}
        onChange={handleChange}
        label="Salary per Month"
        name="salary_per_month"
        type="number"
        placeholder="In USA Dollar"
        errorMessage={errors.salary_per_month}
      />
      <div className="flex gap-3 justify-end">
        <Button
          className="w-28 "
          variant="secondary"
          onClick={handlePreviousStep}
        >
          Back
        </Button>
        <Button
          className="w-28 "
          type="submit"
          loading={loading.addUser || loading.updateUser}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
