import { MdError } from "./Icons";
import { toast } from "sonner";

function ErrorMsg({ msg }) {
    function toastError() {
        toast.error("Connexion Failed Try Again", {
          action: {
            label: "Try Again",
            onClick: () => location.reload(),
          },
        });
    }
  return (
    <div
      onClick={() => toastError()}
      className="w-full h-full min-h-32 flex gap-2 justify-center items-center font-bold text-xl text-red-600"
    >
      {msg} <MdError />
    </div>
  );
}

export default ErrorMsg;
