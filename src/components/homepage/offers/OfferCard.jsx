import { CiLocationOn } from "react-icons/ci";
import { BiTagAlt } from "react-icons/bi";
import { formatTime } from "@/utils/helpers";
import { PiTagChevronFill } from "react-icons/pi";
import { Button } from "@/components/ui";
import { useOfferContext } from "./OffersContext";

export function OfferCard({ offer, card }) {
  const { id, title, date, ville, exp, secteur } = offer;
  const { storedoffers, toggelStoredOffer } = useOfferContext();
  return (
    <div
      className="hover:scale-[1.01] transition-all duration-300 w-full md:w-1/2 lg:w-1/3   p-1 h-max border border-border rounded-xl shadow-md  space-y-2 capitalize"
      style={{ width: `${95 / card}%` }}
    >
      <div className=" bg-background-tertiary rounded-xl p-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-sm font-bold">{formatTime(date)}</span>
          <Button
            onClick={() => toggelStoredOffer(id)}
            color={"secondary"}
            shape={"icon"}
            size={"small"}
          >
            {storedoffers.includes(id) ? (
              <PiTagChevronFill className=" -rotate-90 text-text-primary" />
            ) : (
              <BiTagAlt className=" -rotate-90 text-text-primary" />
            )}
          </Button>
        </div>
        <div className="flex flex-col">
          <span className=" text-text-secondary">DSI</span>
          <span className=" text-xl">{title}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-secondary">
          <span className=" px-2 p-1 rounded-2xl border border-secondary-hover  text-secondary-hover ">
            {exp}
          </span>
          <span className="px-2 p-1 rounded-2xl border border-secondary-hover  text-secondary-hover ">
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
    </div>
  );
}
