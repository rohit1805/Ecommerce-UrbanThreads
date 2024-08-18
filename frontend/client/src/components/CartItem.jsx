import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export function CartItem({
  image,
  name,
  price,
  quantity,
  size,
  desc,
  productId,
  updateCartItems,
  // setItemQuantity,
  // itemQuantity,
}) {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  console.log("updatedQuantity initial value : ", itemQuantity);
  let newQuantity = 0;
  // useEffect(() => {
  //   setItemQuantity(quantity);
  // }, [quantity]);

  // useEffect(() => {
  //   updateQuantity();
  // }, [itemQuantity]);

  const updateQuantity = async () => {
    console.log("updatedQuantity before call : ", itemQuantity);
    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/product/updateQuantity`,
      {
        productId: productId,
        quantity: newQuantity,
        size: size,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    console.log("updatedQuantity after call : ", itemQuantity);
    toast.success(res.data.msg, { position: "bottom-right" });
    updateCartItems();
  };

  const removeFromCart = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/product/removefromcart`,
      {
        productId: productId,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    updateCartItems();
    console.log(res.data);
  };
  return (
    <div className=" flex flex-col  py-3 px-3 border border-neutral-200 shadow-md rounded-md">
      <div className="flex gap-2 mb-2">
        <div>
          <Link to={`/product/${productId} `}>
            <img
              className="h-40 w-28 rounded-md"
              src={image}
              alt="Product image"
            />
          </Link>
          <select
            className=" outline-none border w-28 mt-2 rounded-sm px-1 py-1 text-sm"
            value={quantity}
            onChange={async (e) => {
              // await setItemQuantity(Number(e.target.value));
              console.log("updatedQuantity in onchange : ", itemQuantity);
              newQuantity = e.target.value;
              updateQuantity();
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <hr />
        <div className="w-full">
          <Link to={`/product/${productId} `}>
            <p className="font-medium">{name}</p>
          </Link>
          <p className="text-sm text-stone-600 ">{desc}</p>
          <p className="mt-2 ">
            <span className="font-semibold">₹{price}</span>{" "}
            <span className="text-stone-600 line-through text-sm">₹1000</span>
            <span className="text-green-500"> (60% Off)</span>
          </p>
          <p className="text-sm mb-3">
            You Save <span className="text-green-500">₹500.00</span>
          </p>
          <hr />
          <div className="flex gap-20 my-1">
            <p>
              <b className="text-stone-600">Color:</b> Light Grey
            </p>
            <p>
              <b className="text-stone-600">Size:</b> {size}
            </p>
          </div>
          <hr />
        </div>
      </div>
      <hr />
      <div className="flex mt-2">
        <div className="flex justify-center  w-28 border-r border-neutral-200">
          <button
            className="text-neutral-500 hover:text-rose-600 font-medium px-2"
            onClick={() => removeFromCart()}
          >
            Remove
          </button>
        </div>
        <button className="mx-auto px-2 text-neutral-500 hover:text-neutral-950 font-medium ">
          Move To Wishlist
        </button>
      </div>
    </div>
  );
}
