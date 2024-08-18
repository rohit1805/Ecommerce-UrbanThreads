import { DisplayProducts } from "../components/DisplayProducts";
import { useEffect, useState } from "react";
import axios from "axios";

export function CategoryProducts({ category }) {
  const [allProducts, setAllProducts] = useState([]);
  const [likedProductIds, setLikedProductIds] = useState([]);

  useEffect(() => {
    fetchProductData();
    fetchLikedProductData();
  }, []);

  useEffect(() => {
    fetchProductData();
    fetchLikedProductData();
  }, [category]);

  const fetchProductData = async () => {
    const res = await axios.get(
      `http://localhost:3000/product/${category}-clothing`
    );
    setAllProducts(res.data);
    console.log(res.data);
  };

  // let likedProductIds = [];
  async function fetchLikedProductData() {
    const res = await axios.post(
      "http://localhost:3000/user/showwishlist",
      {},
      {
        headers: {
          authorization: localStorage.getItem("token"),
          "Content-Type": "Application/json",
        },
      }
    );
    const data = res.data.Wishlisted_Products.map(
      (product) => product.productId
    );
    setLikedProductIds(data);
    // console.log("liked products data :", data);
    // console.log("ids of liked products : ", likedProductIds);
  }
  return (
    <div>
      {/* <h1 className="text-3xl ">{category} category </h1> */}
      <DisplayProducts
        allProducts={allProducts}
        likedProductIds={likedProductIds}
        category={category}
      ></DisplayProducts>
    </div>
  );
}
