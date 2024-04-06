import { CiLocationOn } from "react-icons/ci";
import { BiTagAlt } from "react-icons/bi";
import { formatTime } from "@/utils/helpers";
import { PiTagChevronFill } from "react-icons/pi";
import { Button } from "@/components/ui";
import { useOfferContext } from "./OffersContext";
import { Link, useNavigate } from "react-router-dom";
export function OfferCard({ offer }) {
  const { id, title, date, ville, exp, secteur } = offer;
  const navigate = useNavigate();
  const { storedoffers, toggelStoredOffer } = useOfferContext();
  return (
    <div
      onClick={() => navigate(`/offer/${id}`)}
      className={`hover:scale-[1.01] transition-all duration-300 cursor-pointer  p-1 h-max border border-border rounded-xl hover:shadow-md  space-y-2 capitalize`}
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
          <Link to={`/offer/${id}`} className=" text-xl">
            {title}
          </Link>
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
        <Link to={`/offer/${id}`}>
          <Button size={"small"}>Postuler</Button>
        </Link>
      </div>
    </div>
  );
}
