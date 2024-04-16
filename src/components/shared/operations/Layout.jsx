import { Button } from "@/components/ui";
import { PiGridFourFill, PiListBold } from "react-icons/pi";
import { useOperations } from "./useOperations";

export function Layout({className=''}) {
  const { layout, onchangeLayout } = useOperations();
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Button
        shape="icon"
        state={layout === "list" ? "active" : null}
        onClick={() => onchangeLayout("list")}
      >
        <PiListBold className="text-lg" />
      </Button>
      <Button
        shape="icon"
        state={layout === "grid" ? "active" : null}
        onClick={() => onchangeLayout("grid")}
      >
        <PiGridFourFill className="text-lg" />
      </Button>
    </div>
  );
}
