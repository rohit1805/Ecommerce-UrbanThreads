import axios from "axios";
import { useEffect, useState } from "react";
import { OrderCard } from "../components/OrderCard";

export function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/orders`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    // setOrders(res.data.orders);
    setOrders(
      res.data.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  };

  const updateOrders = () => {
    getOrders();
  };
  return (
    <div className="xl:mx-28 lg:mx-6 my-5">
      <h1 className="text-center text-4xl font-medium text-neutral-700 ">
        Your Orders
      </h1>
      <hr className="border-t my-5 border-t-stone-300" />
      <div className="flex flex-col items-center gap-5">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            date={order.createdAt}
            totalAmount={order.totalAmount}
            address={order.address}
            orderId={order.id}
            orderItems={order.orderItems}
            updateOrders={updateOrders}
            status={order.status}
          />
        ))}
      </div>
    </div>
  );
}
