export function PriceDetails() {
  return (
    <div>
      <div className="w-2/5 ml-2 flex flex-col gap-4 ">
        <div className="flex flex-col gap-3 bg-white px-4 py-6 rounded-md">
          <h1 className="text-xl font-semibold">
            PRICE DETAILS ({cartItem.length} items)
          </h1>
          <hr />
          <div className="flex justify-between">
            <p className=" font-light">Total MRP (Inc. of Taxes)</p>
            <p className=" font-semibold">₹{totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className=" font-light">UrbanThreads Discount</p>
            <p> -₹6904</p>
          </div>
          <div className="flex justify-between">
            <p className=" font-light">Shipping</p>
            <p>
              <span className=" line-through">₹49</span>{" "}
              <span className="text-green-500">Free</span>
            </p>
          </div>
          <div className="flex justify-between">
            <p className=" font-light">Cart Total</p>
            <p>₹{totalPrice}</p>
          </div>
        </div>

        <div className="bg-white px-4 py-6 rounded-md">
          <div className="flex justify-between font-semibold text-xl">
            <h2 className="">Total Amount</h2>
            <p>₹{totalPrice}</p>
          </div>
          <button className="w-full bg-green-500 text-xl font-medium py-2 mt-2 hover:bg-green-700 hover:text-white">
            CHECKOUT ORDER
          </button>
        </div>
      </div>
    </div>
  );
}
