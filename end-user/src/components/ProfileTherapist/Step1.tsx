// import { Input } from "@nextui-org/react";
// import { JSX, useMemo, useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { CountryData, PhoneInput } from "react-international-phone";
// import "react-international-phone/style.css";
// import Select from "react-select";
// import countryList from "react-select-country-list";
// export default function Step1(): JSX.Element {
//   const [startDate, setStartDate] = useState(new Date());
//   const [value, setValue] = useState("");
//   const changeHandler = (value: any) => {
//     setValue(value);
//   };

//   const options = useMemo(() => countryList().getData(), []);
//   const inputStyle = {
//     width: "100%",
//   };
//   return (
//     <div>
//       <h3 className="font-bold">Personal Information</h3>

//       <div className="grid md:grid-cols-2 md:gap-x-4 gap-y-4">
//         <div className="md:space-y-2">
//           <label htmlFor="" className="md:text-base text-sm">
//             Profile Picture
//           </label>
//           <input type="file" />
//         </div>

//         <div className="md:space-y-2">
//           <label htmlFor="" className="md:text-base text-sm">
//             Date of Birth
//           </label>
//           <div className="border-2 border-[#E4E4E7] py-1 rounded-md pl-2">
//             <DatePicker
//               selected={startDate}
//               onChange={(date) => setStartDate(date!)}
//             />
//           </div>
//         </div>

//         <div className="md:space-y-2">
//           <label htmlFor="" className="md:text-base text-sm">
//             Full Name
//           </label>
//           <Input variant={"bordered"} color="secondary" size="md" radius="sm" />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label htmlFor="" className="md:text-base text-sm">
//             Sex
//           </label>
//           <select
//             name=""
//             id=""
//             className="border-2 border-[#E4E4E7] py-1 rounded-md"
//           >
//             <option value="" disabled>
//               Select an Option
//             </option>
//             <option value="">Male</option>
//             <option value="">Female</option>
//           </select>
//         </div>

//         <div className="space-y-2">
//           <label htmlFor="" className="md:text-base text-sm">
//             Contact No.
//           </label>
//           <PhoneInput
//             inputProps={{ style: inputStyle }}
//             style={{}}
//             className="border-2 border-[#E4E4E7] rounded-md"
//             defaultCountry="sg"
//             // onChange={(phone: string) => setPhone(phone)}
//           />
//         </div>

//         <div className="md:space-y-2">
//           <label htmlFor="" className="md:text-base text-sm">
//             Passport / Fin No. *
//           </label>
//           <Input variant={"bordered"} color="secondary" size="md" radius="sm" />
//         </div>

//         <div className="flex flex-col space-y-2">
//           <label htmlFor="" className="md:text-base text-sm">
//             Nationality
//           </label>
//           <select
//             className="z-20 w-full border-3 pl-2 py-1.5 rounded-md"
//             onChange={changeHandler}
//           >
//             {options.map((country) => (
//               <option value="">{country.label}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }
