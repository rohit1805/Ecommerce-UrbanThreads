import { useState } from "react";
import { ConfirmedOrders } from "../components/ConfirmedOrders";
import { ShippingOrders } from "../components/ShippingOrders";
import { DeliveredOrders } from "../components/DeliveredOrders";
import { CancelledOrders } from "../components/CancelledOrders";
import axios from "axios";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

export function Orders() {
  const [view, setView] = useState("Confirmed");
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin token is present in localStorage
    if (!localStorage.getItem("token")) {
      // Redirect to login page if token is not present
      navigate("/login");
    }
  }, [navigate]);

  const getAllOrders = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/getOrders`,
      {},
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );

    const orders = res.data.orders;

    const Confirmed = orders.filter((order) => order.status === "Confirmed");
    const Shipping = orders.filter((order) => order.status === "Shipping");
    const Delivered = orders.filter((order) => order.status === "Delivered");
    const Cancelled = orders.filter((order) => order.status === "Cancelled");

    setConfirmedOrders(Confirmed);
    setShippingOrders(Shipping);
    setDeliveredOrders(Delivered);
    setCancelledOrders(Cancelled);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const updateOrders = () => {
    getAllOrders();
  };

  return (
    <div className="my-5 xl:mx-28 lg:mx-6">
      <h1 className="text-2xl font-medium text-center ">Orders</h1>
      <div className="my-2 mx-1">
        <ul className="flex gap-4">
          <li
            className={`text-stone-700 px-2 cursor-pointer hover:text-black ${
              view == "Confirmed"
                ? "font-bold underline underline-offset-4 text-black"
                : ""
            }`}
            onClick={() => setView("Confirmed")}
          >
            Confirmed
          </li>
          <li
            className={`text-stone-700 px-2 cursor-pointer hover:text-black ${
              view == "Shipping"
                ? "font-bold underline underline-offset-4 text-black"
                : ""
            }`}
            onClick={() => setView("Shipping")}
          >
            Shipping
          </li>

          <li
            className={`text-stone-700 px-2 cursor-pointer hover:text-black ${
              view == "Delivered"
                ? "font-bold underline underline-offset-4  text-black"
                : ""
            }`}
            onClick={() => setView("Delivered")}
          >
            Delivered
          </li>
          <li
            className={`text-stone-700 px-2 cursor-pointer hover:text-black ${
              view == "Cancelled"
                ? "font-bold underline underline-offset-4  text-black"
                : ""
            }`}
            onClick={() => setView("Cancelled")}
          >
            Cancelled
          </li>
        </ul>
      </div>
      <hr />
      <div>
        {view == "Confirmed" ? (
          <ConfirmedOrders
            updateOrders={updateOrders}
            orders={confirmedOrders}
          />
        ) : (
          ""
        )}
        {view == "Shipping" ? (
          <ShippingOrders orders={shippingOrders} updateOrders={updateOrders} />
        ) : (
          ""
        )}
        {view == "Delivered" ? (
          <DeliveredOrders
            orders={deliveredOrders}
            updateOrders={updateOrders}
          />
        ) : (
          ""
        )}
        {view == "Cancelled" ? (
          <CancelledOrders
            orders={cancelledOrders}
            updateOrders={updateOrders}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
