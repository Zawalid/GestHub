import Shade from "@/components/ui/shade";
import { useOffer } from "@/features/offers/useOffers";
import { useEffect } from "react";

function OfferDetails() {
  const { data } = useOffer();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className=" relative min-h-[85vh]">
 
    </div>
  );
}

export default OfferDetails;
