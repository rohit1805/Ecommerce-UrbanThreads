import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Hero_1 from "../assets/Hero_1.jpeg";
import Hero_2 from "../assets/Hero_2.jpeg";
import { Link } from "react-router-dom";

const NextArrow = (props) => {
  const { onClick } = props;
  console.log("next arrow rendered");
  return (
    <div
      className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-transparent text-neutral-800 rounded-full p-2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5l7 7-7 7"
        ></path>
      </svg>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  console.log("prev arrow rendered");
  return (
    <div
      className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-transparent text-neutral-800 rounded-full p-2 z-10 cursor-pointer"
      onClick={onClick}
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
    </div>
  );
};

export function HomeSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "Linear",
  };

  return (
    <div>
      <Slider {...settings} className=" rounded-3xl overflow-hidden relative">
        <div className="">
          <img src={Hero_1} alt="Slide 1" className=" w-full rounded-3xl" />
          <div className="flex flex-col mt-48  gap-5 absolute top-32 right-52 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl text-black">Limited Time Offer!</h1>
            <h1 className="text-7xl text-black font-semibold font-montagu">
              Winter-Spring 2024!
            </h1>
            <h1 className="text-2xl font-light  text-black">
              Take 20% Off "SALE20"
            </h1>
            <div className="flex gap-3">
              <Link to={"/mens"}>
                <button className="text-md font-medium  text-white bg-black px-5 py-3">
                  SHOP MEN'S
                </button>
              </Link>
              <button className="text-md text-black font-medium  bg-white border border-white px-3 py-2">
                {/* SHOP WOMEN'S */}
                NEW ARRIVAL
              </button>
            </div>
          </div>
        </div>
        <div>
          <img src={Hero_2} alt="Slide 2" className=" w-full rounded-3xl " />
          <div className="flex flex-col mt-48  gap-5 absolute top-32 left-80 transform -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-xl text-black">Limited Time Offer!</h1>
            <h1 className="text-7xl text-black font-semibold font-montagu">
              Beyond style
              <br /> yourself.
            </h1>
            {/* <h1 className="text-7xl text-black font-semibold">yourself</h1> */}
            <h1 className="text-2xl font-light  text-black">
              Take 20% Off "SALE20"
            </h1>
            <div className="flex gap-3">
              <Link to={"/womens"}>
                <button className="text-md font-medium  text-white bg-black px-5 py-3">
                  SHOP WOMEN'S
                </button>
              </Link>
              <button className="text-md text-black font-medium  bg-white border border-white px-3 py-2">
                {/* SHOP WOMEN'S */}
                NEW ARRIVAL
              </button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
