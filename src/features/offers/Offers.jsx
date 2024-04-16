import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  FilterAside,
  OfferCard,
} from "./index";
import { Status } from "@/components/ui/Status";
import Shade from "@/components/ui/shade";
import { Operations } from "@/components/shared/operations/Operations";
import { useOperations } from "@/components/shared/operations/useOperations";

function Offers() {
  const [parent] = useAutoAnimate({ duration: 300 });
const {data:offers,isLoading,error,layout,}=useOperations()
  return (

    <div id="offers" className="relative md:px-0  bg-background-secondary min-h-[70vh]" >
      {error && <Status status="error" heading={error.message} />}
      {isLoading && <Status status="loading" />}
      {!error && !isLoading && (
        <div className="p-1 md:p-5">
          <h1 className="text-text-primary font-bold text-3xl w-fit py-10 capitalize">
            Offres de stage recentes
          </h1>
          <div className="grid gap-4  grid-cols-1 md:grid-cols-[auto,1fr] h-full">
            <FilterAside className="hidden md:flex" />
            <div className="relative">
              <div className="grid px-1 grid-cols-[1fr,auto] gap-2 ">
                <Operations.Search />
                <Operations.Layout className='hidden md:flex'/>
                <div className='flex md:hidden'>
                    <Operations.Filter  />
                </div>
              </div>
              {offers?.length > 0 ? (
                <div
                  ref={parent}
                  className={`max-h-screen overflow-y-auto p-2 py-4 text-text-primary grid grid-cols-1 md:grid-cols-${layout==='grid'?2:1} justify-center gap-4 my-5`}
                >
                  {offers?.map((e, i) => (
                    <OfferCard key={i} offer={e} />
                  ))}
                </div>
              ) : (
                  <div className=" flex pt-10 flex-col justify-center items-center ">
                    <img  src="/images/no_result.png"  alt="no results"  className="w-[150px]" />
                  </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Shade
        className=" absolute rotate-180 bottom-full left-0 w-full overflow-hidden leading-[0] "
        svg="h-14 md:h-16 w-full"
      />
      </div>
  );
}

export default Offers;
