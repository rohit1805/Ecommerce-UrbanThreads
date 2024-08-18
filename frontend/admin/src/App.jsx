import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import { AddProduct } from "./pages/AddProduct";
import { Products } from "./pages/Products";
import { Login } from "./pages/Login";
import { Orders } from "./pages/Orders";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
