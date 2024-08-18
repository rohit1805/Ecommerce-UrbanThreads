import hero_img_1 from "../assets/hero-1.png";
import { HomeSlider } from "../components/HomeSlider";

export function Home() {
  return (
    <div className=" lg:mx-6 xl:mx-28 mt-5  ">
      {/* <h1 className="text-3xl ">Home</h1> */}
      <HomeSlider />

      {/* <div className=" bg-yellow-600 flex px-28 justify-between pt-5 ">
        <div className="flex flex-col mt-48  gap-5">
          <h1 className="text-xl text-black">Limited Time Offer!</h1>
          <h1 className="text-7xl text-black font-semibold">
            Winter-Spring 2024!
          </h1>
          <h1 className="text-2xl font-light  text-black">
            Take 20% Off "SALE20"
          </h1>
          <div className="flex gap-3">
            <button className="text-md font-medium  hover:text-black hover:bg-white text-white bg-black px-5 py-3">
              SHOP WOMEN'S
            </button>
            <button className="text-md text-white font-medium hover:text-black hover:bg-white bg-transparent border border-white px-3 py-2">
              SHOP MEN'S
            </button>
          </div>
        </div>
        <img className=" w-5/12" src={hero_img_1} alt="Hero image" />
      </div> */}
    </div>
  );
}
