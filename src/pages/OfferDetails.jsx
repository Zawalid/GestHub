import Shade from "@/components/ui/Shade";
import { useOffer } from "@/features/offers/useOffers";
import { useEffect } from "react";

function OfferDetails() {
  const { data } = useOffer();
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className=" relative min-h-[85vh]">
      <Shade className="absolute top-0 left-0 w-full overflow-hidden leading-[0]" />
      <Shade
        className=" absolute rotate-180 md:top-[92.3%] top-[95%] left-0 w-full overflow-hidden leading-[0] "
        svg="h-12 md:h-16 w-full"
      />
    </div>
  );
}

export default OfferDetails;
