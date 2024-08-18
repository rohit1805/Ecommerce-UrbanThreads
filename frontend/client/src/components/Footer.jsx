import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="relative flex flex-col mt-16">
      <p className="text-center text-white">.</p>
      <div className=" bg-pink-700 flex justify-between gap-16 absolute xl:mx-28 lg:mx-6 px-16 py-8 text-white">
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>

          <div>
            <h2 className="font-semibold">Free Shipping</h2>
            <p>When ordering over ₹1000</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <div>
            <h2 className="font-semibold">Free Return</h2>
            <p>Get return within 10 days</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>

          <div>
            <h2 className="font-semibold">Secure Payment</h2>
            <p>100% Secure Online Payment</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
            />
          </svg>

          <div>
            <h2 className="font-semibold">Best Quality</h2>
            <p>Original Product Guarenteed</p>
          </div>
        </div>
      </div>
      <div className=" bg-black text-white xl:px-28 lg:px-6 mt-9 pt-20">
        <div className="flex justify-between gap-10 pt-10 pb-20">
          <div className="flex flex-col gap-3 w-3/12">
            <h1 className="text-2xl font-bold mb-8 underline underline-offset-8 decoration-pink-600">
              About The Brand
            </h1>
            <Link to={"/"}>
              <h1 className=" text-xl md:text-2xl ">
                <span className="font-fondamento font-extrabold text-3xl md:text-3xl  text-pink-600">
                  Urban
                </span>
                <span className="font-kavivanor text-white">Threads</span>
              </h1>
            </Link>
            <p className=" mt-5">
              One of the most popular on the web is shopping.
            </p>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p>Pune, Maharashtra, India.</p>
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
              <p>+91-9172894616</p>
            </div>
            <div className="flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <p>urbanthreads@gmail.com</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 w-3/12">
            <h1 className="text-2xl font-bold mb-8 underline underline-offset-8 decoration-pink-600">
              Quick Links
            </h1>
            <a href="" className=" hover:text-pink-600 w-max">
              About Us
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Shop Now!
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Women's
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Men's
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              FAQ's
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Contact Us
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Customer Services
            </a>
          </div>
          <div className="flex flex-col gap-3 w-3/12">
            <h1 className="text-2xl font-bold mb-8 underline underline-offset-8 decoration-pink-600">
              Customer Support
            </h1>
            <a href="" className=" hover:text-pink-600 w-max">
              My Account
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Checkout
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Cart
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              FAQ's
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Order Tracking
            </a>
            <a href="" className=" hover:text-pink-600 w-max">
              Help & Support
            </a>
          </div>
          <div className="flex flex-col gap-3 w-3/12">
            <h1 className="text-2xl font-bold mb-8 underline underline-offset-8 decoration-pink-600">
              Newsletter
            </h1>
            <p>To get the latest news and latest updates from us.</p>
            <p>Enter your E-mail Address:</p>
            <input
              type="email"
              placeholder="Enter email id....."
              className="px-2 py-2 outline-none text-black"
            />
            <button className=" bg-pink-600 p-2 font-medium hover:bg-white hover:text-black">
              Subscribe
            </button>
          </div>
        </div>
        {/* <hr className="text-white" /> */}
      </div>
    </div>
  );
};
