import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";

export function WishlishItem({
  id,
  productId,
  image,
  name,
  desc,
  price,
  updateWishlistItems,
}) {
  const removeFromWishlist = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/product/removefromwishlist",
        {
          productId: productId,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      updateWishlistItems();
    } catch (error) {}
  };

  return (
    <div className="w-60 mt-2 px-2 py-2 bg-neutral-100 rounded-md">
      <Link to={`/product/${productId}`}>
        <img className="w-full h-auto rounded-t-md" src={image} alt="" />
      </Link>
      <Link to={`/product/${productId}`}>
        <p className=" truncate mt-2">{name}</p>
      </Link>
      <p className="text-sm font-medium text-neutral-400">{desc}</p>
      <p className="mt-2">
        <span className=" font-medium">₹{price} </span>

        <span className=" line-through text-sm text-neutral-400">₹1000</span>
        <span className="text-green-500 font-medium"> (60% Off)</span>
      </p>
      <div className="flex justify-center gap-2 mt-2">
        {/* <button className=" w-2/4 text-sm  border border-stone-600 px-2 py-1 rounded hover:ring-1  ring-black">
          Add To Cart
        </button> */}
        <button
          className="w-2/4 border border-red-600 px-2 py-1 rounded  bg-red-500 text-white"
          onClick={removeFromWishlist}
        >
          Remove
          {/* <MdDeleteForever className="w-6 h-6 fill-white  " /> */}
        </button>
      </div>
    </div>
  );
}
