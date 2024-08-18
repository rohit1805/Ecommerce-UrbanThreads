import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };
  return date.toLocaleString("en-US", options);
}

export function OrderCard({
  orderId,
  userId,
  status,
  totalAmount,
  date,
  email,
  usersFirstName,
  usersLastName,
  phoneno,
  address,
  orderItems,
  updateOrders,
}) {
  const formattedDate = formatDate(date);

  //   const cancelOrder = async () => {
  //     try {
  //       const res = await axios.put(
  //         "http://localhost:3000/user/cancelOrder",
  //         {
  //           orderId: orderId,
  //         },
  //         {
  //           headers: {
  //             authorization: localStorage.getItem("token"),
  //             "Content-Type": "Application/json",
  //           },
  //         }
  //       );
  //       updateOrders();
  //     } catch (error) {
  //       console.log("error while cancelling order : ", error);
  //     }
  //   };

  const updateStatus = async () => {
    const newStatus =
      status === "Confirmed"
        ? "Shipping"
        : status === "Shipping"
        ? "Delivered"
        : "Unknown";
    const res = await axios.put(
      "http://localhost:3000/admin/updateOrderStatus",
      {
        orderId: orderId,
        status: newStatus,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    updateOrders();
  };

  return (
    <div className="border border-stone-400 w-10/12 rounded-lg shadow-lg">
      <div className="flex flex-col justify-between items-center bg-zinc-200 px-8 py-5  rounded-t-lg border-b border-stone-400 ">
        <div className=" flex flex-col w-full">
          <div className="flex justify-between">
            <div>
              <h1>USER INFO:</h1>
              <p>
                Name: {usersFirstName} {usersLastName}
              </p>
              <p>Email Id: {email}</p>
              <p>User Id: {userId}</p>
              <p>Phone No.: {phoneno}</p>
            </div>
            <div>
              {status === "Delivered" || status === "Cancelled" ? (
                ""
              ) : (
                <button
                  className=" bg-lime-400 px-4 py-2 hover:bg-lime-500"
                  onClick={() => updateStatus()}
                >
                  Mark as{" "}
                  {status === "Confirmed"
                    ? "Shipping"
                    : status === "Shipping"
                    ? "Delivered"
                    : " "}
                </button>
              )}
            </div>
          </div>
          <hr className="border-t-stone-400 my-3" />
        </div>

        <div className="flex justify-between items-center w-full">
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
              <span className="text-neutral-500 text-sm">ORDER #</span>{" "}
              {orderId}
            </p>
            <div className="flex flex-col bg-white rounded py-1 px-4">
              <p className="text-sm ">STATUS</p>

              <p
                className={`font-medium ${
                  status === "Cancelled"
                    ? "text-red-500"
                    : status === "Confirmed"
                    ? "text-blue-500"
                    : status === "Shipped"
                    ? "text-emerald-500"
                    : "text-lime-500"
                }`}
              >
                {status}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-5 flex  rounded-b-lg">
        <div className="grid grid-cols-2 gap-8  w-10/12">
          {orderItems.map((item) => (
            <div key={item.id} className=" flex col-span-1 gap-3">
              <div>
                <Link to={`/product/${item.product.id}`}>
                  <img
                    className="w-24  border border-stone-400 rounded-md"
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
                <p>Product Id: {item.id}</p>
                <p>
                  Quantity : {item.quantity} | Size : {item.size}
                </p>
                <p> Price : ₹{item.price}.00</p>
              </div>
            </div>
          ))}
        </div>
        {/* {status != "Cancelled" && status != "Delivered" ? (
          <div className=" w-2/12 flex justify-end  items-center">
            <button
              className="border border-black px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-medium"
              //   onClick={() => cancelOrder()}
            >
              Cancel
            </button>
          </div>
        ) : (
          " "
        )} */}
      </div>
    </div>
  );
}
