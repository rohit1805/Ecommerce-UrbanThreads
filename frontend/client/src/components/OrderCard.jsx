import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleString("en-US", options);
}

export function OrderCard({
  date,
  totalAmount,
  address,
  orderId,
  orderItems,
  updateOrders,
  status,
}) {
  const formattedDate = formatDate(date);

  const cancelOrder = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/cancelOrder`,
        {
          orderId: orderId,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "Application/json",
          },
        }
      );
      updateOrders();
    } catch (error) {
      console.log("error while cancelling order : ", error);
    }
  };

  return (
    <div className="border border-stone-400 w-10/12 rounded-lg shadow-lg">
      <div className="flex justify-between items-center bg-zinc-200 px-8 py-2 h-20 rounded-t-lg border-b border-stone-400">
        <div className="flex justify-between gap-8">
          <div>
            <p className="text-sm text-neutral-500 ">ORDER PLACED</p>

            <p>{formattedDate}</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 ">TOTAL </p>

            <p>₹{totalAmount}.00</p>
          </div>
          <div>
            <p className="text-sm text-neutral-500 ">SHIP TO</p>

            <p>
              {address.firstName} {address.lastName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <p>
            <span className="text-neutral-500 text-sm">ORDER #</span> {orderId}
          </p>
          <div className="flex flex-col bg-white rounded py-1 px-4">
            <p className="text-sm ">STATUS</p>

            <p
              className={`font-medium ${
                status == "Cancelled"
                  ? "text-red-500"
                  : status == "Confirmed"
                  ? "text-blue-500"
                  : status == "Shipped"
                  ? "text-emerald-500"
                  : "text-lime-500"
              }`}
            >
              {status}
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 flex  rounded-b-lg">
        <div className="flex flex-col gap-4  w-10/12">
          {orderItems.map((item) => (
            <div key={item.id} className="flex gap-2">
              <div>
                <Link to={`/product/${item.product.id}`}>
                  <img
                    className="w-20  border border-stone-400 rounded-md"
                    src={item.product.images[0].imageUrl}
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex flex-col ">
                <Link to={`/product/${item.product.id}`}>
                  <p>{item.product.name}</p>
                </Link>
                <p className="text-sm text-stone-600 font-medium">
                  {item.product.description}
                </p>
                <p>
                  Quantity : {item.quantity} | Size : {item.size}
                </p>
                <p> Price : ₹{item.price}.00</p>
              </div>
            </div>
          ))}
        </div>
        {status != "Cancelled" && status != "Delivered" ? (
          <div className=" w-2/12 flex justify-end  items-center">
            <button
              className="border border-black px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium"
              onClick={() => cancelOrder()}
            >
              Cancel
            </button>
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
