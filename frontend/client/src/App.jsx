import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { CategoryProducts } from "./pages/CategoryProducts";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Navbar } from "./components/Navbar";
import { Product } from "./pages/Product";
import { Profile } from "./pages/Profile";
import { Addresses } from "./pages/Addresses";
import { OrderConfirmed } from "./pages/OrderConfirmed";
import { Orders } from "./pages/Orders";
import { Footer } from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/mens"
          element={<CategoryProducts category={"mens"}></CategoryProducts>}
        ></Route>
        <Route
          path="/womens"
          element={<CategoryProducts category={"womens"}></CategoryProducts>}
        ></Route>
        <Route
          path="/kids"
          element={<CategoryProducts category={"kids"}></CategoryProducts>}
        ></Route>
        <Route path="/product" element={<Product></Product>}>
          <Route path=":productId" element={<Product></Product>}></Route>
        </Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/wishlist" element={<Wishlist></Wishlist>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/address" element={<Addresses></Addresses>}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        <Route path="/orderConfirmed" element={<OrderConfirmed />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
