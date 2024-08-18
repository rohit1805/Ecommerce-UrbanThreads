import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef(null);
  const navigte = useNavigate();

  const handleMouseEnter = () => {
    // console.log(
    //   "button In and isopen : ",
    //   isOpen,
    //   " and is hovering : ",
    //   isHovering
    // );
    setIsOpen(true);
    // setIsHovering(true);
    // console.log(
    //   "button In and isopen : ",
    //   isOpen,
    //   " and is hovering : ",
    //   isHovering
    // );
  };

  const handleMouseLeave = () => {
    // console.log("button out");
    // setTimeout(() => {
    //   if (!isHovering) {
    //     console.log("popup closed");
    setIsOpen(false);
    //   }
    // }, 5000);
    // console.log(
    //   "value of isOpen : ",
    //   isOpen,
    //   " amd is hovering : ",
    //   isHovering
    // );
  };

  // const handlePopupMouseEnter = () => {
  //   console.log(" popup in and is hovering : ", isHovering);
  //   setIsHovering(true);
  //   console.log(" popup in and is hovering : ", isHovering);
  // };

  // const handlePopupMouseLeave = () => {
  //   console.log(" popup out and is hovering : ", isHovering);
  //   setIsHovering(false);
  //   console.log(" popup out and is hovering : ", isHovering);
  //   handleMouseLeave();
  // };

  const handleOutsideClick = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className=" shadow-sm">
      <div className=" flex flex-col gap-3 md:flex-row justify-between px-5 py-3 md:px-6 md:py-0 md:items-center xl:px-28 md:pb-0">
        <div className=" flex justify-between">
          <Link to={"/"}>
            <h1 className=" text-xl md:text-2xl ">
              <span className="font-fondamento font-extrabold text-3xl md:text-3xl  text-pink-600">
                Urban
              </span>
              <span className="font-kavivanor text-neutral-950">Threads</span>
            </h1>
          </Link>

          <div className=" md:hidden flex gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 hover:fill-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </div>
        </div>

        <ul className=" flex flex-col gap-1 md:flex-row md:gap-4 font-medium text-stone-600 text-sm  ">
          <Link to={"/mens"}>
            <li className="w-max px-2 py-6  rounded-lg hover:text-neutral-950 hover:font-bold">
              MEN
            </li>
          </Link>
          <Link to={"/womens"}>
            <li className="w-max px-2 py-6 rounded-lg hover:text-neutral-950 hover:font-bold">
              WOMEN
            </li>
          </Link>
          <Link to={"/kids"}>
            <li className="w-max px-2 py-6 rounded hover:text-neutral-950 hover:font-bold ">
              KIDS
            </li>
          </Link>
          <Link to={""}>
            <li className="w-max px-2 py-6 rounded-lg hover:text-neutral-950 hover:font-bold ">
              NEW ARRIVALS
            </li>
          </Link>
        </ul>

        <div className=" hidden md:flex gap-2 items-center border px-3 py-2 w-96 border-neutral-300 rounded-lg focus:bg-white :bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            className=" bg-transparent outline-none text-sm w-full"
            placeholder="Search "
          />
        </div>

        <div className=" hidden md:flex gap-5 items-center">
          <div
            className="px-3 py-7 "
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 hover:fill-black "
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            {isOpen && (
              <div
                ref={popupRef}
                className=" absolute w-64  bg-white z-10 rounded-md  border border-neutral-300 lg:right-14 lg:top-20 xl:right-32 shadow-xl ease-in-out duration-300 flex flex-col gap-3 p-3 texds"
                // onMouseEnter={handlePopupMouseEnter}
                // onMouseLeave={handlePopupMouseLeave}
              >
                <div>
                  {localStorage.getItem("token") ? (
                    <div>
                      <button
                        onClick={() => {
                          localStorage.removeItem("token");
                          navigte("/login");
                        }}
                        className=" border border-neutral-200  px-5 py-2 rounded-md font-semibold hover:shadow-md hover:border-pink-600 text-pink-600 text-sm"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h4 className="font-bold">Welcome</h4>
                      <p className="text-sm text-neutral-600">
                        To access account and manage orders
                      </p>
                      <Link to={"/signup"}>
                        <button className=" border border-neutral-200  px-5 py-2 rounded-md font-semibold hover:shadow-md hover:border-pink-400 text-pink-600 text-sm">
                          Login <b>/</b> Sign Up
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
                <hr />
                <ul className="w-full text-sm ">
                  <Link to={"/profile"}>
                    <li className="hover:font-semibold cursor-pointer w-max">
                      Your Profile
                    </li>
                  </Link>
                  <Link to={"/orders"}>
                    <li className="hover:font-semibold cursor-pointer w-max">
                      Orders
                    </li>
                  </Link>

                  <li className="hover:font-semibold cursor-pointer w-max">
                    Contact Us
                  </li>
                </ul>
                <hr />
                <ul className="w-full text-sm">
                  <li className="hover:font-semibold cursor-pointer w-max">
                    Coupons
                  </li>
                  <li className="hover:font-semibold cursor-pointer w-max">
                    Saved Cards
                  </li>
                  <Link to={"/address"}>
                    <li className="hover:font-semibold cursor-pointer w-max">
                      Saved Addresses
                    </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
          <Link to={"/wishlist"}>
            <div className="px-3 py-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  className="hover:shadow"
                />
              </svg>
            </div>
          </Link>

          <Link to={"/cart"}>
            <div className="px-3 py-3 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          </Link>
        </div>

        <div className=" md:hidden ml-2">
          <button className=" border border-neutral-800 px-8 py-2 rounded-lg font-semibold ">
            Login <b>/</b> Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
