import { FaCircle } from "react-icons/fa";

export function Radio({ checked, onChange, className = "", ...props }) {
  return (
    <div
      className={"relative h-5 flex items-center justify-center" + className}
      onClick={(e) => e.stopPropagation()}
    >
      <input
        type="radio"
        className="peer transition-none h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-border transition-colors duration-200 disabled:cursor-not-allowed  checked:border-0 checked:bg-primary focus:outline-none"
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <FaCircle className="pointer-events-none absolute text-xs hidden text-center text-white transition-none duration-0 peer-checked:block" />
    </div>
  );
}
