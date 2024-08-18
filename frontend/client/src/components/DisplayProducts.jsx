import axios from "axios";
import { useEffect, useState } from "react";
import { Item } from "./Item";

export function DisplayProducts({ category, allProducts, likedProductIds }) {
  // const [allProducts, setAllProducts] = useState([]);
  // const [likedProductIds, setLikedProductIds] = useState([]);

  // useEffect(() => {
  //   fetchProductData();
  //   fetchLikedProductData();
  // }, []);

  // useEffect(() => {
  //   fetchProductData();
  //   fetchLikedProductData();
  // }, [category]);

  // const fetchProductData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:3000/product/${category}-clothing`
  //   );
  //   setAllProducts(res.data);
  //   console.log(res.data);
  // };

  // // let likedProductIds = [];
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
  //   const data = res.data.Wishlisted_Products.map(
  //     (product) => product.productId
  //   );
  //   setLikedProductIds(data);
  //   // console.log("liked products data :", data);
  //   // console.log("ids of liked products : ", likedProductIds);
  // }

  return (
    <div className=" mx-2 md:mx-6 xl:mx-28 my-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {allProducts.map((product) => (
        <div key={product.id} className=" flex flex-col ">
          <Item
            productId={product.id}
            imageUrl={product.images[0].imageUrl}
            name={product.name}
            description={product.description}
            price={product.price}
            likedProductIds={likedProductIds}
          ></Item>
        </div>
      ))}
    </div>
  );
}
