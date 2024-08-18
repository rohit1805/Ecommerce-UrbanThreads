import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-between items-center w-full h-16 border-b px-28 bg-neutral-950 text-white">
      <h1 className="text-2xl font-medium">Admin</h1>

      <ul className="flex gap-5">
        <Link to={"/addProduct"}>
          <li className=" hover:bg-neutral-700 px-4 text-sm py-2 rounded">
            Add Product
          </li>
        </Link>
        <Link to={"/products"}>
          <li className=" hover:bg-neutral-700 px-4 text-sm py-2 rounded">
            View Products
          </li>
        </Link>
        <Link to={"/orders"}>
          <li className=" hover:bg-neutral-700 px-4 text-sm py-2 rounded">
            View Orders
          </li>
        </Link>
      </ul>

      <button
        className="bg-white text-black font-medium px-5 hover:bg-stone-200 text-sm py-2 rounded"
        onClick={() => {
          if (localStorage.getItem("token")) {
            localStorage.removeItem("token");
            navigate("/login");
          } else {
            navigate("/login");
          }
        }}
      >
        {localStorage.getItem("token") ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Navbar;
