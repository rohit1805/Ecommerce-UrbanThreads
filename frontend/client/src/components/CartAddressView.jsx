import { SelectAddressCard } from "./SelectAddressCard";
import { useEffect, useState } from "react";
import axios from "axios";

export function CartAddresstView({ setShippingAddressId, shippingAddressId }) {
  const [addresses, setAddresses] = useState([]);
  //   const [selectedAddressId, setSelectedAddressId] = useState(null);

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

  const handleAddressSelection = (addressId) => {
    setShippingAddressId(addressId);
  };

  console.log("all addresses from cartAddressView :", addresses);
  return (
    <div className=" bg-white px-4 py-6 rounded-md w-full mr-20">
      <h1 className="mb-5 text-2xl font-medium uppercase">
        Select Shipping Address:
      </h1>
      <div className="flex flex-col gap-3">
        {addresses.map((address) => {
          return (
            <SelectAddressCard
              key={address.id}
              firstName={address.firstName}
              lastName={address.lastName}
              address={address.address}
              city={address.city}
              district={address.district}
              state={address.state}
              PINcode={address.PINcode}
              phoneno={address.phoneno}
              selected={shippingAddressId === address.id}
              onSelect={() => handleAddressSelection(address.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
