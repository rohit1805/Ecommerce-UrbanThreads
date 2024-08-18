import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export function Breadcrum({ productData }) {
  return (
    <div className="flex gap-2 items-center my-3">
      <Link to={"/"}>
        <h1>HOME</h1>
      </Link>
      <FaAngleRight />
      <Link to={"/mens"}>
        <h1 className=" uppercase">{productData.category}</h1>
      </Link>
      <FaAngleRight />
      <Link to={`/product/${productData.id}`}>
        <h1 className=" uppercase">{productData.name}</h1>
      </Link>
    </div>
  );
}
