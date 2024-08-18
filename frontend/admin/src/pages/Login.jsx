import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const res = await axios.post("http://localhost:3000/admin/login", {
      email: email,
      password: password,
    });

    const token = `Bearer ${res.data.token}`;
    localStorage.setItem("token", token);
    toast.success("Login Successful.", {
      theme: "dark",
      position: "bottom-right",
    });
    navigate("/addProduct");
  };

  return (
    <div>
      <div className="w-4/12 mx-auto my-5 flex flex-col mt-40 gap-2 shadow-lg bg-gray-100 rounded-md py-12 px-8">
        <h1 className="text-center text-3xl font-semibold">Admin Login</h1>
        <div className="flex flex-col gap-1 mt-8">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className="outline-none border border-stone-500 rounded focus:ring-1 ring-black px-1 py-1"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="outline-none border border-stone-500 rounded focus:ring-1 ring-black px-1 py-1"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className=" bg-black py-2 text-white rounded mt-5"
          onClick={() => login()}
        >
          Login
        </button>
      </div>
    </div>
  );
}
