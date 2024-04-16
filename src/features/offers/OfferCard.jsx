import { CiLocationOn } from "react-icons/ci";
import { FaCertificate } from "react-icons/fa";
import { formatTime } from "@/utils/helpers";
import { Button, Modal } from "@/components/ui";
import { FaRegStar,FaStar } from "react-icons/fa6";

import { useOfferContext } from "./OffersContext";
import { Link, useNavigate, useParams } from "react-router-dom";
export function OfferCard({ offer }) {
  const { id, title, date, ville, experience, secteur ,status} = offer;
  const { storedoffers, toggelStoredOffer } = useOfferContext();
  const { id: detailedId } = useParams()
  const navigate=useNavigate()
  return (
    <div className="relative hover:scale-[1.01] transition-all duration-300   p-1 h-max border border-border rounded-xl hover:shadow-md  space-y-2 capitalize" >
      <div className="relative bg-background-tertiary rounded-xl p-4 space-y-4 cursor-pointer"
        onClick={()=>navigate(`/offers/${id}`)}
      >
          <div className="grid grid-cols-[1fr,auto,auto] gap-1">
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
              <FaStar className=" text-yellow-500" />
            ) : (
              <FaRegStar className="  text-text-primary" />
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
            {experience}
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
        <Link to={`/offers/${id}`}>
          <Button size={"small"}>Details</Button>
        </Link>
      </div>
      <Modal
        isOpen={id===detailedId}
        className="p-5 sm:w-3/4 lg:w-1/2 md:border  sm:h-fit"
        onClose={()=>navigate('/')}
      >
        <OfferDetailsCard offer={offer} />
      </Modal>
    </div>
  );
}

function OfferDetailsCard({offer}) {
      const {description,direction,secteur,experience,ville,skills,title}=offer
      return (
        <div className="text-text-primary pt-10 space-y-3 md:space-y-6">
          <div className=" flex gap-2 justify-start items-center capitalize"> 
            <div className=" bg-text-primary text-background-primary p-5 font-bold rounded-lg">
              <p>{ direction}</p>
            </div>
            <div>
              <p className=" text-2xl font-bold">{title} <span className=" text-text-tertiary text-sm "> ({experience})</span></p>
              <p className=" text-text-secondary">{ ville}</p>
            </div>
          </div>
          <div className=" flex flex-col gap-2 capitalize">
            <div className=" flex items-center gap-2 ">
             <span className=" font-bold"> Secteur </span> : <span >{secteur}</span> 
            </div>
            <div className=" flex gap-2 items-center">
              <span className="font-bold">
                Skills
              </span> :
              {skills.map((skill, i) => <span key={i} className=" border-2 border-secondary text-secondary p-1 font-bold rounded-md">{skill}</span>)}
              </div>
          </div>
          <div className=" bg-background-secondary p-3 border border-border rounded-md">
            {description}
          </div>
          <div className=" flex justify-between">

            <Link to="/">
              <Button color="tertiary">Cancel</Button>
            </Link>
            <Link to="/Login">
              <Button color="primary">Postuler</Button>
            </Link>
          </div>
        </div>
      );
}
