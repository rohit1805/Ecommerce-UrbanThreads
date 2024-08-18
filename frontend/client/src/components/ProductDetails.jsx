import { useState } from "react";
import { StarIcon } from "./StarIcon";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ProductDetails({ productData }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [like, setLike] = useState(false);
  const [warning, setWarning] = useState(false);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const images = productData.images;

  // const notify = () => toast("Product Added to Cart !");

  if (!images) {
    return <div>Loading...</div>;
  }

  const handleSelectedSize = (size) => {
    setSelectedSize(size);
  };

  async function addToWishlist() {
    try {
      const res = await axios.post(
        "http://localhost:3000/product/addtowishlist",
        {
          productId: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {}
  }

  async function removeFromWishlist() {
    try {
      const res = await axios.post(
        "http://localhost:3000/product/removefromwishlist",
        {
          productId: id,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {}
  }

  const giveSizeWarning = () => {
    setWarning(true);
  };

  const addToCart = async () => {
    const res = await axios.post(
      "http://localhost:3000/product/addtocart",
      {
        productId: productData.id,
        quantity: quantity,
        size: selectedSize,
      },
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    // notify;
    toast.success("Item added successfully.", {
      position: "bottom-right",
      theme: "dark",
    });
    console.log(res.data);
  };

  console.log("size :", selectedSize);
  console.log("Quantity : ", quantity);
  console.log("warning : ", warning);

  return (
    <div className="flex gap-10">
      {/* ------------------------------- left side -------------------------- */}
      <div className="flex gap-1 w-2/4">
        <div className="flex flex-col gap-3 w-2/12">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.imageUrl}
              className="w-24 h-32"
              onClick={() => {
                setCurrentImage(index);
                setWarning(false);
              }}
            />
          ))}
        </div>
        <div className="w-10/12">
          <img
            className="border-3 h-full w-full"
            src={images[currentImage].imageUrl}
            alt=""
          />
        </div>
      </div>

      {/* ------------------------------- Right side -------------------------- */}
      <div className="w-2/4 ">
        <h1 className="text-2xl font-medium mt-4">{productData.name}</h1>
        <h4 className=" font-medium text-lg text-stone-500">
          {productData.description}
        </h4>
        <h2 className="mt-4">
          <span className="text-xl font-medium">
            ₹{productData.price} &nbsp;
          </span>
          <span className=" line-through text-stone-400 text-sm">
            &nbsp;₹1000
          </span>
          <span className="text-green-500 font-semibold">&nbsp; (55% off)</span>
        </h2>
        <h4 className=" text-stone-600">
          Inclusive of All Taxes + Free Shipping
        </h4>
        <div className="flex mt-6">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <p>
            <span className=" font-medium">&nbsp; 4.8</span>
            <span className=" font-light">&nbsp;(36 Ratings & Reviews)</span>
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-medium">SIZE :</h2>
          {warning && (
            <div className="text-red-500 font-bold"> Please select a size</div>
          )}
          <div className="flex gap-4 mt-2">
            {sizes.map((size) => (
              <button
                key={size}
                className={` border border-neutral-900  text-lg rounded-md py-3 px-5 ${
                  selectedSize == size
                    ? "bg-black text-yellow-400 font-semibold"
                    : ""
                }`}
                onClick={() => handleSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <h2 className="text-xl font-medium">QTY: </h2>
          <select
            className=" outline-none border border-stone-800 w-16 h-8 py-1 px-2"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
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

        <button
          className="w-52 h-12 mt-8 font-semibold hover:bg-yellow-400 bg-yellow-300 text-black"
          onClick={() => {
            {
              if (!selectedSize) {
                giveSizeWarning();
              } else {
                addToCart();
              }
            }
          }}
        >
          ADD TO CART
        </button>
        <ToastContainer />

        {/*------------------------- wishlish button in right corner --------------------------*/}
        <div className="bg-white rounded-full border border-stone-400 w-8 h-8 flex justify-center absolute top-36 right-32">
          <button
            onClick={() => {
              if (!like) {
                setLike(true);
                addToWishlist();
              } else {
                setLike(false);
                removeFromWishlist();
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={`w-6 h-6  ${like ? "fill-rose-500" : "fill-white"}`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
