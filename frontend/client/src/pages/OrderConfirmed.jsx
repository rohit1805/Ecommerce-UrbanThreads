import { useEffect } from "react";
import orderConfirmedIcon from "../assets/checkout.png";
import shoppingBag from "../assets/shopping-bag.png";
import axios from "axios";
import { Link } from "react-router-dom";

export function OrderConfirmed() {
  useEffect(() => {
    // Call a function to empty the cart
    emptyCart();
  }, []);

  const emptyCart = async () => {
    try {
      // Make a request to the backend to empty the cart
      await axios.post("http://localhost:3000/product/emptycart", null, {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      });
    } catch (error) {
      console.error("Error emptying cart:", error);
      // Handle error if necessary
    }
  };

  return (
    <div className="xl:mx-28 lg:mx-6 flex flex-col justify-center items-center xl:pt-24 lg:pt-36">
      <img
        className="w-40"
        src={orderConfirmedIcon}
        alt="order confirmation image"
      />
      <h1 className=" text-4xl font-rocknroll font-semibold mt-10">
        Thank you for ordering!
      </h1>
      <div className="flex gap-3 mt-5">
        <Link to={"/orders"}>
          <button className="border border-black px-5 py-2">VIEW ORDER</button>
        </Link>
        <button className="px-5 py-2 bg-lime-400 hover:bg-lime-500">
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
}
