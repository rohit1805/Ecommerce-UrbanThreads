import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Item({
  productId,
  imageUrl,
  name,
  description,
  price,
  likedProductIds,
}) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    likedProductIds.map((id) => {
      if (id == productId) {
        setLike(true);
      }
    });
  }, []);

  // async function fetchLikedProductData() {
  //   const res = await axios.post(
  //     "http://localhost:3000/user/showwishlist",
  //     {},
  //     {
  //       headers: {
  //         authorization: localStorage.getItem("token"),
  //         "Content-Type": "Application/json",
  //       },
  //     }
  //   );
  //   const data = res.data.Wishlisted_Products;
  //   data.map((product) => {
  //     if (product.id == id) {
  //       setLike(true);
  //     }
  //   });
  // }
  console.log("ids of liked products : ", likedProductIds);

  async function addToWishlist() {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/product/addtowishlist`,
        {
          productId: productId,
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
        `${import.meta.env.VITE_BASE_URL}/product/removefromwishlist`,
        {
          productId: productId,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {}
  }

  return (
    <div className=" relative border border-neutral-200 rounded-t-3xl">
      <Link to={`/product/${productId}`}>
        <img
          src={imageUrl}
          alt="product-image"
          className="w-max h-auto mb-1 rounded-t-3xl"
        />
        <div className="flex flex-col px-1 py-1">
          <h2 className="text-sm">{name}</h2>
          <p className="text-stone-400">{description}</p>
          <p>₹{price}</p>
        </div>
      </Link>
      <div className="bg-white rounded-full border w-8 h-8 flex justify-center absolute top-2 right-2">
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
  );
}
