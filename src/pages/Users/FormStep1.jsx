import { useFetchData } from "../../hooks/useFetchData";
import Input from "@/components/Input";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import ImageInput from "@/components/ImageInput";

export function FormStep1({ form, handleNextStep }) {
  const { values, handleChange, errors } = form;

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

      <Input
        label="First Name"
        name="first_name"
        placeholder="John"
        value={values.first_name}
        onChange={handleChange}
        errorMessage={errors.first_name}
      />
      <Input
        label="Last Name"
        name="last_name"
        placeholder="Doe"
        value={values.last_name}
        onChange={handleChange}
        errorMessage={errors.last_name}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="example@mail.com"
        value={values.email}
        onChange={handleChange}
        errorMessage={errors.email}
      />
      <Input
        label="Phone"
        name="phone"
        type="tel"
        placeholder="+621111118888"
        value={values.phone}
        onChange={handleChange}
        errorMessage={errors.phone}
      />
      {!countriesLoading && (
        <Dropdown
          name="nationality"
          placeholder="Select country ..."
          label="Nationality"
          options={Object.entries(countries.data).map((item) => ({
            name: item[1].country,
            value: item[1].country,
          }))}
          value={values.nationality}
          onSelectedChange={handleChange}
          errorMessage={errors.nationality}
        />
      )}
      <Input
        label="Date of Birth"
        name="dob"
        type="date"
        value={values.dob}
        onChange={handleChange}
        errorMessage={errors.dob}
      />
      <ImageInput
        onChange={handleChange}
        name="avatar"
        label="Profile Image"
        errorMessage={errors.avatar}
        value={values.avatar}
      />
      <Button className="w-28 ml-auto" onClick={handleNextStep}>
        Next
      </Button>
    </div>
  );
}
