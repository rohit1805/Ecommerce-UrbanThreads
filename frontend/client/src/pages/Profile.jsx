import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState();
  const [phoneno, setPhoneno] = useState();
  const [selectedGender, setSelectedGender] = useState("");
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  const genderOptions = ["Male", "Female", "Other"];

  const handleSelectedGender = (gender) => {
    setSelectedGender(gender);
    setIsChanged(true);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/profileInfo`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    setUserDetails(res.data.User_info);
    setFirstName(res.data.User_info.firstName);
    setLastName(res.data.User_info.lastName);
    setDob(new Date(res.data.User_info.dob));
    setPhoneno(res.data.User_info.phoneno);
    setSelectedGender(res.data.User_info.gender);
    console.log(selectedGender);
  };

  const updateChanges = async () => {
    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/updateProfile`,
      {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        phoneno: phoneno,
        gender: selectedGender,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    // navigate("/profile");
    toast.success(res.data.msg, { position: "bottom-right" });
  };

  console.log(userDetails);
  console.log(selectedGender);

  return (
    <div className="flex justify-center mt-12">
      <div className=" flex flex-col justify-center  w-96 gap-3">
        <div className="flex justify-center">
          <div className="bg-yellow-400 border text-4xl font-bold text-white rounded-full w-20 h-20 flex justify-center items-center shadow-2xl">
            {firstName ? firstName.slice(0, 1) : "U"}
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className=" text-sm font-medium">
            First Name
          </label>
          <input
            className=" outline-none border border-neutral-300 focus:ring-1 ring-black rounded my-1 px-2 py-1"
            type="text"
            defaultValue={userDetails.firstName}
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
              setIsChanged(true);
            }}
            value={firstName}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className=" text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            className=" outline-none border border-neutral-300 focus:ring-1 ring-black rounded my-1 px-2 py-1"
            defaultValue={userDetails.lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setIsChanged(true);
            }}
            placeholder="Last Name"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className=" text-sm font-medium">
            Date of birth
          </label>
          <input
            type="date"
            defaultValue={userDetails.dob}
            className=" outline-none border border-neutral-300 focus:ring-1 ring-black rounded my-1 px-2 py-1"
            onChange={(e) => {
              setDob(new Date(e.target.value));
              setIsChanged(true);
            }}
            value={dob ? dob.toISOString().slice(0, 10) : ""}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className=" text-sm font-medium">
            Phone No.
          </label>
          <div className="flex gap-2">
            <div className="border border-neutral-300 rounded my-1 px-2 py-1">
              +91
            </div>
            <input
              type="text"
              className=" outline-none border border-neutral-300 focus:ring-1 ring-black rounded my-1 px-2 py-1"
              defaultValue={userDetails.phoneno}
              onChange={(e) => {
                setPhoneno(e.target.value);
                setIsChanged(true);
              }}
              placeholder="Phone No"
            />
          </div>
        </div>
        <div className="flex gap-4 items-center mt-1">
          <h1>Gender: </h1>
          <div className="flex gap-4 mt-2">
            {genderOptions.map((gender) => {
              console.log("Gender:", gender);
              console.log("Selected Gender:", selectedGender);
              return (
                <button
                  key={gender}
                  className={` border border-neutral-900 rounded py-1 px-2 ${
                    selectedGender &&
                    gender.toLowerCase() == selectedGender.toLowerCase()
                      ? " bg-yellow-400 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleSelectedGender(gender)}
                >
                  {gender}
                </button>
              );
            })}
          </div>
        </div>
        <button
          className={`bg-yellow-400 hover:bg-yellow-500 py-2 rounded font-medium text-lg mt-4 ${
            !isChanged ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => {
            updateChanges();
            console.log("firstName: ", firstName);
            console.log("lastName: ", lastName);
            console.log("Date of birth", dob);
            console.log("Phone Number: ", phoneno);
            console.log("Gender: ", selectedGender);
          }}
          disabled={!isChanged}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
