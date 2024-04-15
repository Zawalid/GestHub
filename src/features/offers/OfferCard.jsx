import { CiLocationOn } from "react-icons/ci";
import { BiTagAlt } from "react-icons/bi";
import { formatTime } from "@/utils/helpers";
import { PiTagChevronFill } from "react-icons/pi";
import { Button, Modal } from "@/components/ui";
import { useOfferContext } from "./OffersContext";
import { useEffect, useState } from "react";
export function OfferCard({ offer }) {
  const { id, title, date, ville, exp, secteur } = offer;
  const [isDetailsOfferOpen, setIsDetailsOfferOpen] = useState(false);
  const { storedoffers, toggelStoredOffer } = useOfferContext();
  useEffect(() => {
    console.log( isDetailsOfferOpen);
  }, [isDetailsOfferOpen]);
  return (
    <div
      onClick={() => setIsDetailsOfferOpen(true)}
      className={`relative hover:scale-[1.01] transition-all duration-300 cursor-pointer  p-1 h-max border border-border rounded-xl hover:shadow-md  space-y-2 capitalize`}
    >
      <div className=" bg-background-tertiary rounded-xl p-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-bold">{formatTime(date)}</span>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggelStoredOffer(id);
            }}
            color={"secondary"}
            shape={"icon"}
            size={"small"}
          >
            {storedoffers.includes(id) ? (
              <PiTagChevronFill className=" -rotate-90 text-secondary" />
            ) : (
              <BiTagAlt className=" -rotate-90 text-secondary" />
            )}
          </Button>
        </div>
        <div className="flex flex-col">
          <span className=" text-text-secondary">DSI</span>
          <div className=" text-xl">
            {title}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-secondary">
          <span className=" px-2 p-1 rounded-2xl  bg-secondary  text-white ">
            {exp}
          </span>
          <span className="px-2 p-1 rounded-2xl bg-secondary text-white">
            {secteur}
          </span>
        </div>
      </div>
      <div className="flex justify-between px-5 p-2">
        <span className=" text-text-secondary flex items-center gap-2">
          <CiLocationOn className="text-text-primary" /> {ville}
        </span>
          <Button size={"small"}>Postuler</Button>
      </div>
      <Modal
      isOpen={isDetailsOfferOpen}
        className="p-5 sm:w-3/4 lg:w-1/2 md:border  sm:h-fit"
        closeButton={true}
        onClose={() => setIsDetailsOfferOpen(false)}
      >
        <OfferDetailsCard offer={offer} />
      </Modal>
    </div>
  );
}

function OfferDetailsCard({offer}) {
 
      return (
        <div className="text-text-primary pt-10">
          <p>{offer.title}</p>
          <p>{offer.description}</p>
        </div>
      );
}
