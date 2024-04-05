import { useState } from "react";
import Shade from "@/components/ui/shade";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

function About() {
  return (
    <div id="about" className=" relative p-5 py-24  md:px-10">
      <div>
        <h1 className=" text-text-primary text-center font-bold text-5xl">
          About Us
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2   text-text-primary ">
          <div className="hidden lg:flex justify-center items-center py-10">
            <img className="w-2/3" src="/images/main-img.png" alt="" />
          </div>
          <div className=" flex flex-col space-y-6 py-6">
            <h1 className=" text-2xl">direction de system informatique</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor
              unde repellendus cum eum et illum neque non minus dolorem officiis
              ipsam quae animi totam vel velit reprehenderit, sed obcaecati
              pariatur.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 p-3 rounded-lg h-max bg-background-secondary border border-border">
              <div className=" grid grid-cols-1 h-min gap-4">
                <div className=" flex flex-col md:flex-row ">
                  <span className=" text-text-secondary font-bold">
                    Telephone :{" "}
                  </span>
                  <span>+212 675178574</span>
                </div>
                <div className=" flex flex-col md:flex-row ">
                  <span className=" text-text-secondary font-bold">
                    Email :
                  </span>
                  <span>email@exemple.com</span>
                </div>
              </div>
              <MapLocation />
            </div>
          </div>
        </div>
      </div>
      <Shade
        className=" absolute rotate-180 md:top-[89.3%] top-[92%] left-0 w-full overflow-hidden leading-[0] "
        svg="h-16 md:h-18 lg:h-20 w-full"
      />
    </div>
  );
}

export default About;

function MapLocation() {
  const [mapIsOpen, setMapIsOpen] = useState(false);
  return (
    <div className=" flex flex-col gap-2">
      <div
        className=" flex items-center hover:bg-background-tertiary px-2 p-1 rounded-md transition duration-300 cursor-pointer justify-between gap-3"
        onClick={() => setMapIsOpen((e) => !e)}
      >
        <span className="flex items-center">
          <CiLocationOn /> Location
        </span>
        <IoIosArrowDown />
      </div>
      <div
        className=" transition-[height] bg-background-tertiary border border-border duration-500 overflow-hidden rounded-lg active"
        style={{ height: mapIsOpen ? "200px" : "0px",border:!mapIsOpen&&'none' }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.16598525745!2d-6.858738424189181!3d33.98827007318123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76d6b99660137%3A0x2e8e7d79b04b2d11!2sDSI%20MEN!5e0!3m2!1sfr!2sma!4v1712325098680!5m2!1sfr!2sma"
          width="100%"
          height="100%"
          style={{border:0}}
        />
      </div>
    </div>
  );
}
