import { useEffect, useState } from "react";
import axios from "axios";
import { WishlishItem } from "../components/WishlistItem";

export function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/showwishlist`,
      {},
      {
        headers: {
          "Content-Type": "Application/json",
          authorization: localStorage.getItem("token"),
        },
      }
    );
    console.log(res.data.Wishlisted_Products);
    setWishlistItems(res.data.Wishlisted_Products);
  };

  const updateWishlistItems = () => {
    fetchData();
  };

  return (
    <div className=" lg:mx-6 xl:mx-28 my-4">
      <h1 className="text-4xl font-bold text-center">Wishlist Products</h1>
      <hr className="my-4" />
      <div className="grid gap-5 lg:grid-cols-5 xl:grid-cols-5 ">
        {wishlistItems.map((item) => (
          <WishlishItem
            key={item.id}
            productId={item.productId}
            name={item.product.name}
            image={item.product.images[0].imageUrl}
            desc={item.product.description}
            price={item.product.price}
            updateWishlistItems={updateWishlistItems}
          />
        ))}
      </div>
    </div>
  );
}
