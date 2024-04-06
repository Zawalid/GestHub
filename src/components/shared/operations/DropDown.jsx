import { Button, DropDown as D } from "@/components/ui";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useOperations } from "./useOperations";

// eslint-disable-next-line react-refresh/only-export-components
export const options = {
  placement: "right-start",
  className: "max-h-[100%]",
  trigger: "click",
  shouldCloseOnClick: false,
};

export function DropDown({ children }) {
  const { isLoading,error } = useOperations();
  return (
    <D
      toggler={
        <Button shape="icon">
          <IoEllipsisHorizontalSharp />
        </Button>
      }
      togglerClassName="icon-button not-active"
      options={{
        placement: "bottom-start",
        className: "w-60 max-h-[100%]",
        shouldCloseOnClick: false,
      }}
      togglerDisabled={isLoading || error}
    >
      {children}
    </D>
  );
}
