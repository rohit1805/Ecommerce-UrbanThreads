import { CartItems } from "../components/CartItems";

export function Cart() {
  return (
    <div className=" lg:my-5 lg:mx-6 xl:mx-28 bg-stone-100 px-3 py-3 rounded-md">
      <h1 className="text-4xl font-bold text-center">Shopping Cart</h1>
      <hr className="my-5 border-neutral-300" />
      <CartItems></CartItems>
    </div>
  );
}
