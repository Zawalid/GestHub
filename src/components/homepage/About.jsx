import { useState } from "react";
import { IoIosArrowDown, IoIosMail } from "react-icons/io";
import { BsTelephoneFill } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import Shade from "../ui/shade";

function About() {
  return (
    <div className="relative p-2 py-24 md:px-10 grid grid-cols-1 gap-3">
      <div>
        <h1 className="text-center p-3 text-5xl text-primary dark:text-text-primary font-bold">
          About DSI
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DsiSummary />
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center  gap-4 rounded-lg border border-border bg-background-secondary p-4">
            <div className="grid h-8 w-8 place-content-center rounded-full bg-secondary text-white">
              <BsTelephoneFill />
            </div>
            <div className="space-y-2">
              <h2 className=" font-bold text-primary">Phone Number</h2>
              <a
                href="tel:+212537889900"
                className="text-sm font-medium text-text-secondary "
              >
                +212 537889900
              </a>
            </div>
          </div>
          <div className="flex items-center  gap-4 rounded-lg border border-border bg-background-secondary p-4">
            <div className="grid h-8 w-8 place-content-center rounded-full bg-secondary text-white  ">
              <IoIosMail />
            </div>
            <div className="space-y-2">
              <h2 className=" font-bold text-primary">Email Address</h2>
              <a
                href="mailto:stagiaire@men.gov.ma"
                className="text-sm font-medium text-text-secondary "
              >
                stagiaire@men.gov.ma
              </a>
            </div>
          </div>
          <DsiLocation />
        </div>
      </div>
      {/* <Shade className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-0" /> */}
    </div>
  );
}

export default About;

function DsiSummary() {
  return (
    <div className=" border border-border rounded-lg p-3 bg-background-secondary ">
      <h1 className=" text-balance text- font-bold text-center text-2xl py-3">{`La Direction du système d'information`}</h1>
      <div className=" ">
        <p className=" text-secondary ">{`La Direction du système d'information a pour missions de:`}</p>
        <ul className="p-2 px-3">
          <li className="text-text-primary">
            {`- Concevoir, mettre en place et suivre le système d'information statistique du Ministère`}
          </li>
          <li className="text-text-primary">{`- Réaliser des études à caractère organisationnel`}</li>
          <li className="text-text-primary">{`- Contribuer à l'élaboration du schéma directeur informatique du Ministère et des académies régionales d'éducation et de formation.`}</li>
        </ul>
      </div>
      <div className=" ">
        <p className=" text-secondary ">{`La Direction du système d'information est composée de:`}</p>
        <ul className="p-2 px-3">
          <li className="text-text-secondary ">
            <span className=" font-semibold">
              {" "}
              {`1) Division de la stratégie informatique`}
            </span>

            <ul className="p-1 px-3">
              <li>{`- Service des études informatiques`}</li>
              <li>{`- Service de pilotage des schémas directeurs informatiques`}</li>
            </ul>
          </li>
          <li className="text-text-secondary">
            <span className=" font-semibold">{`2) Centre informatique`}</span>
            <ul className="p-1 px-3">
              <li>{`-  Service de l'administration de la banque de données statistiques`}</li>
              <li>{`- Service de la gestion de la logistique informatique et de l'administration des réseaux`}</li>
              <li>{`- Le Centre informatique a rang de division de l'administration centrale.`}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

function DsiLocation() {
  const [mapIsOpen, setMapIsOpen] = useState(true);

  return (
    <div
      className="flex flex-col rounded-lg border border-border bg-background-secondary p-4 cursor-pointer hover:bg-background-tertiary"
      onClick={() => setMapIsOpen((e) => !e)}
    >
      <div className="flex items-center justify-between  gap-4 ">
        <div className="grid h-8 w-8 place-content-center rounded-full bg-secondary text-white">
          <IoLocationSharp />
        </div>
        <div className={`flex-1  ${mapIsOpen && "pb-3"}  `}>
          <h2 className=" font-bold text-primary"> Location</h2>
          <a
            href="https://maps.app.goo.gl/miz9LAa9i2FCbZNa7"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-text-secondary "
          >
            Av. Ibn Rochd, Rabat
          </a>
        </div>
        <button
          className={`text-text-primary transition-transform duration-500 ${
            mapIsOpen && "rotate-180"
          } `}
        >
          <IoIosArrowDown />
        </button>
      </div>
      <div
        className="overflow-hidden border border-border rounded-lg transition-[height] duration-500 h-0"
        style={{
          height: mapIsOpen ? "300px" : "0px",
          border: !mapIsOpen && "none",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3308.16598525745!2d-6.858738424189181!3d33.98827007318123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76d6b99660137%3A0x2e8e7d79b04b2d11!2sDSI%20MEN!5e0!3m2!1sfr!2sma!4v1712325098680!5m2!1sfr!2sma"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          width="100%"
          height="300"
        ></iframe>
      </div>
    </div>
  );
}
