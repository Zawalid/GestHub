import { useContext } from "react";
import { TableContext } from "./TableProvider";

export { TableProvider as Table } from "./TableProvider";

export function useTable() {
  const context = useContext(TableContext);

  if (!context) throw new Error("useTable must be used within a TableProvider");

  return context;
}
