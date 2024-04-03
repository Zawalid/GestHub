import { toast } from "sonner";
import { useEffect } from "react";
function Spinner() {
  function toastError() {
    toast(
      <div className="flex font-bold items-center gap-4">
        <MiniSpiner /> Loading Data ...
      </div>
    );
  }
  return (
    <div
      onClick={() => toastError()}
      className="flex-col gap-4 w-full h-full flex items-center justify-center"
    >
      <div className="loader border-t-4 border-l-4 border-dashed rounded-full border-primary  animate-spin aspect-square w-28 flex justify-center items-center text-yellow-700"></div>
    </div>
  );
}

export default Spinner;
function MiniSpiner() {
  return (
    <div className="loader border-t-2 rounded-full border-gray-500  animate-spin aspect-square w-4 flex justify-center items-center text-yellow-700"></div>
  );
}
