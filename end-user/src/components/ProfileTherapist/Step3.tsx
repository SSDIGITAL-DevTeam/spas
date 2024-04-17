import { Input } from "@nextui-org/react";
import { JSX, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CountryData, PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import countryList from "react-select-country-list";
export default function Step3(): JSX.Element {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("");
  const changeHandler = (value: any) => {
    setValue(value);
  };

  const options = useMemo(() => countryList().getData(), []);
  const inputStyle = {
    width: "100%",
  };
  return (
    <div>
      <h3 className="font-bold">Employment History</h3>

      <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4">
        <div className="md:space-y-2">
          <label htmlFor="" className="md:text-base text-sm">
            Add Certificate
          </label>
          <input type="file" />
        </div>

        <div className="md:space-y-2">
          <label htmlFor="" className="md:text-base text-sm">
            Title
          </label>
          <Input variant={"bordered"} color="secondary" size="md" radius="sm" />
        </div>

        <div className="md:space-y-2">
          <label htmlFor="" className="md:text-base text-sm">
            Start Date
          </label>
          <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
            />
          </div>
        </div>

        <div className="md:space-y-2">
          <label htmlFor="" className="md:text-base text-sm">
            End Date
          </label>
          <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date!)}
            />
          </div>
        </div>

        <div className="md:space-y-2">
          <label htmlFor="" className="md:text-base text-sm">
            Company Name
          </label>
          <Input variant={"bordered"} color="secondary" size="md" radius="sm" />
        </div>

        <div className="md:space-y-2">
          <label htmlFor="" className="md:text-base text-sm">
            Description
          </label>
          <Input variant={"bordered"} color="secondary" size="md" radius="sm" />
        </div>

        <div className="md:space-y-2">
          <label htmlFor="" className="md:text-base text-sm">
            Location
          </label>
          <Input variant={"bordered"} color="secondary" size="md" radius="sm" />
        </div>
      </div>
    </div>
  );
}
