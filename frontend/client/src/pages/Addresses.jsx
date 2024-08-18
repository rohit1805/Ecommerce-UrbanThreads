import axios from "axios";
import { useEffect, useState } from "react";
import { AddressCard } from "../components/AddressCard";

export function Addresses() {
  const [infoTab, setInfoTab] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [alternatePhoneNo, setAlternatePhoneNo] = useState("");

  useEffect(() => {
    getAddresses();
  }, []);

  const getAddresses = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/showAddress`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    setAddresses(res.data.all_addresses);
  };
  // console.log("------", addresses);

  const addAddress = async () => {};

  if (infoTab) {
    return (
      <div className="lg:mx-6 xl:mx-28 flex justify-center gap-5 mt-5 flex-col items-center">
        <div className="flex justify-between  w-2/4">
          <h1 className=" text-xl font-medium">Fill Delivery Info </h1>
          <button
            onClick={() => setInfoTab(false)}
            className=" font-semibold text-xl hover:text-red-600"
          >
            {/* X */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-2/4 flex flex-col gap-3">
          <div className="flex gap-3 ">
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                First Name
              </label>
              <input
                type="text"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </div>
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                Last Name
              </label>
              <input
                type="text"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className=" text-stone-500">
              Address
            </label>
            <input
              type="text"
              className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
              placeholder="Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-3 ">
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                City
              </label>
              <input
                type="text"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="City"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </div>
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                District
              </label>
              <input
                type="text"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="District"
                onChange={(e) => {
                  setDistrict(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                State
              </label>
              <input
                type="text"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="State"
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
            </div>
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                Pin code
              </label>
              <input
                type="number"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="Pin code"
                onChange={(e) => {
                  setPinCode(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                Phone No.
              </label>
              <input
                type="number"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="Phone No."
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                }}
              />
            </div>
            <div className="w-2/4 flex flex-col">
              <label htmlFor="" className=" text-stone-500">
                Alternate Phone No.(Optional)
              </label>
              <input
                type="number"
                className=" outline-none border border-stone-400 rounded p-1 focus:ring-1 ring-black"
                placeholder="Phone No."
                onChange={(e) => {
                  setAlternatePhoneNo(e.target.value);
                }}
              />
            </div>
          </div>
          <button className=" bg-yellow-400 w-max m-auto py-2 px-5 font-medium mt-5">
            Save Address
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="lg:mx-6 xl:mx-28 flex justify-center items-center flex-col my-3 py-2 px-1">
      <div className="w-2/4 flex justify-between">
        <button
          className="border border-neutral-400 px-3 py-1 rounded hover:ring-1 ring-black"
          onClick={() => setInfoTab(true)}
        >
          + Add New Address
        </button>
        <button className=" hover:underline">Change Default Address</button>
      </div>
      <div className="flex flex-col gap-4 my-5 w-2/4 ">
        {addresses &&
          addresses.map((address) => {
            return (
              <AddressCard
                key={address.id}
                firstName={address.firstName}
                lastName={address.lastName}
                address={address.address}
                city={address.city}
                district={address.district}
                state={address.state}
                PINcode={address.PINcode}
                isDefault={address.isDefault}
                phoneno={address.phoneno}
              ></AddressCard>
            );
          })}
      </div>
    </div>
  );
}
