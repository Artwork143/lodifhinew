import React from "react";
import { NavLink } from "react-router-dom";
import Carousel from "../components/Carousel";
import ImageLink from "../components/ImageLink";
// import Carousel2 from "../components/Carousel2";
import { Carousel as Carouselv2 } from 'flowbite-react';
import { carouselData } from "../data";

function Pictures(carouselData) {
  return (
    <div>
            <img
              src={carouselData.Source}
              alt="Logo of all HMO"
              className="shadow-md"
            ></img>
          </div>
  )
}

function Carousel2() {
  return (
    <div className="h-56 sm:h-64 xl:h-[500px] 2xl:h-[600px]">
      <Carouselv2>
      {carouselData.map(Pictures)}
      </Carouselv2>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* <div
        class="relative overflow-hidden bg-cover bg-no-repeat hidden lg:flex lg:justify-start lg:items-center"
        style={{
          backgroundPosition: "50%",
          backgroundImage: `url('homepagemobile.jpg')`,
          height: "600px",
        }}
      >
        <div className="absolute left-28 xl:left-44 2xl:left-80">
          <h1 className="text-4xl border-l-[#337CCF] border-l-4 pl-2 text-slate-50 font-bold">
            YOUR HEALTH <br />
            IS OUR CONCERN
          </h1>
        </div>
      </div> */}

      <div
        class="h-[200px] lg:h-[600px] overflow-hidden bg-cover bg-no-repeat flex lg:grid lg:grid-cols-6 justify-start items-center gap-5"
        style={{
          backgroundPosition: "50%",
          backgroundImage: `url('homepagemobile.jpg')`,
        }}
      >
        <div className="col-start-2 col-span-2 duration-500 border-l-[#337CCF] border-l-4 pl-2 ml-5 lg:ml-0">
          <h1 className="text-xl lg:text-4xl text-slate-50 font-bold cursor-default">
            YOUR HEALTH <br />
            IS OUR CONCERN
          </h1>
          <button type="button" className="mt-1 py-2.5 me-2 mb-2">
            <NavLink
              to="/about"
              className="font-bold text-white hover:text-[#337CCF] bg-blue-300 hover:bg-blue-50 hover:border-blue-400 rounded-r-lg px-3 py-1 border-white-400 border-4 pb-2 text-sm lg:text-lg duration-500"
            >
              Learn More
            </NavLink>
          </button>
        </div>
        <div className="col-start-4 col-end-6 hidden lg:block">
          <Carousel2 />
        </div>
      </div>

      <div className="py-[3px] border-white border-t-[13px] shadow-inner2 overflow-hidden flex-row md:flex justify-evenly">
        <ImageLink
          src="/doctorlink.webp"
          route="/about/doctors"
          title="Doctors"
        />
        <ImageLink
          src="/serviceslink.avif"
          route="/services"
          title="Services"
        />
         <ImageLink
          src="/roomslink.jpg"
          route="/about/patientrooms"
          title="Patient Rooms"
        />
      </div>

      <div>
        <Carousel />
      </div>

      {/* <div
        class="lg:hidden overflow-hidden bg-cover bg-no-repeat flex justify-start items-center"
        style={{
          backgroundPosition: "50%",
          backgroundImage: `url('homepagemobile.jpg')`,
          height: "200px",
        }}
      >
        <h1 className="text-xl border-l-[#337CCF] border-l-4 ml-5 pl-2 text-slate-50 font-bold">
          YOUR HEALTH <br />
          IS OUR CONCERN
        </h1>
      </div> */}
    </>
  );
}

export default Home;
