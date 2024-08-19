import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

import { PriceDetails } from "./PriceDetails";
import { CartProductView } from "./CartProductView";
import { CartAddresstView } from "./CartAddressView";
import { CartPaymentView } from "./CartPaymentView";
import { useNavigate } from "react-router-dom";

export function CartItems() {
  const [cartItem, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [view, setView] = useState("product");
  const [shippingAddressId, setShippingAddressId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");

  const navigate = useNavigate();

  // const [itemQuantity, setItemQuantity] = useState(quantity);

  // console.log("-------------------", cartItem);
  // const token = localStorage.getItem("token");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/showcart`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      }
    );
    // console.log("Cart items : ", res.data.Products);
    setCartItems(res.data.Products);
    let total = 0;
    res.data.Products.map(
      (item) => (total = total + item.price * item.quantity)
    );
    // console.log(total);
    setTotalPrice(total);
  };

  const updateCartItems = async () => {
    await fetchData();
  };

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_API_KEY);
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/create-checkout-session`,
      {
        cartItem,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );

    const session = response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    } else {
      // Payment successful, call order confirmation API
      await confirmOrder();
    }
  };

  const confirmOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/orderConfirmed`,
        {
          addressId: shippingAddressId,
          totalAmount: totalPrice,
          status: "Confirmed", // Or whatever initial status you want
          products: cartItem.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
          })),
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
            "Content-Type": "Application/json",
          },
        }
      );
      navigate("/orderConfirmed");

      console.log("Order confirmed:", response.data);
      // Redirect to order confirmation page or show a success message to the user
    } catch (error) {
      console.error("Error confirming order:", error);
      // Handle error - show error message to the user or retry the operation
    }
  };

  console.log("Shipping address id : ", shippingAddressId);

  console.log("view value : ", view);
  console.log("Payment Method : ", paymentMethod);
  console.log("CartItems : ", cartItem);
  return (
    <div className="flex">
      <div className="w-3/5">
        {view == "product" ? (
          <CartProductView
            cartItem={cartItem}
            updateCartItems={updateCartItems}
            // setItemQuantity={setItemQuantity}
            // itemQuantity={itemQuantity}
          />
        ) : (
          ""
        )}
        {view == "address" ? (
          <CartAddresstView
            shippingAddressId={shippingAddressId}
            setShippingAddressId={setShippingAddressId}
          />
        ) : (
          ""
        )}
        {view == "payment" ? (
          <CartPaymentView setPaymentMethod={setPaymentMethod} />
        ) : (
          ""
        )}
      </div>

      <div className="w-2/5 ml-2 flex flex-col gap-4 ">
        <div className="flex flex-col gap-3 bg-white px-4 py-6 rounded-md">
          <h1 className="text-xl font-semibold">
            PRICE DETAILS ({cartItem.length} items)
          </h1>
          <hr />
          <div className="flex justify-between">
            <p className=" font-light">Total MRP (Inc. of Taxes)</p>
            <p className=" font-semibold">₹{totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className=" font-light">UrbanThreads Discount</p>
            <p> -₹6904</p>
          </div>
          <div className="flex justify-between">
            <p className=" font-light">Shipping</p>
            <p>
              <span className=" line-through">₹49</span>{" "}
              <span className="text-green-500">Free</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className=" font-light">Cart Total</p>
            <p>₹{totalPrice}</p>
          </div>
        </div>

        <div className="bg-white px-4 py-6 rounded-md">
          <div className="flex justify-between font-semibold text-xl">
            <h2 className="">Total Amount</h2>
            <p>₹{totalPrice}</p>
          </div>
          <button
            className="w-full bg-green-500 text-xl font-medium py-2 mt-2 hover:bg-green-700 hover:text-white"
            onClick={() => {
              if (view == "product") {
                setView("address");
              }
              if (view == "address") {
                setView("payment");
              }

              if (view == "payment" && paymentMethod == "Debit/Credit Card") {
                makePayment();
              }
              if (view == "payment" && paymentMethod == "Cash on Delivery") {
                confirmOrder();
              }
              console.log("view value on click : ", view);
            }}
          >
            CHECKOUT ORDER
          </button>
        </div>
        {/* <PriceDetails /> */}
      </div>
    </div>
  );
}
