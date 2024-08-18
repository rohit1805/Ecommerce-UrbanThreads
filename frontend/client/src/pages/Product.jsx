import { useParams } from "react-router-dom";
import { Breadcrum } from "../components/Breadcrum";
import { ProductDetails } from "../components/ProductDetails";
import { useEffect, useState } from "react";
import axios from "axios";

export function Product() {
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  console.log("produc id : ", productId);
  useEffect(() => {
    console.log("useEffect hit");
    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:3000/product/allproducts/${productId}`
      );
      console.log("image fetched data : ", res.data);
      setProductData(res.data);
    };
    fetchData();
  }, [productId]);
  return (
    <div className="lg:mx-6 xl:mx-28 px-2 py-2">
      <Breadcrum productData={productData} />
      <ProductDetails productData={productData} />
    </div>
  );
}
