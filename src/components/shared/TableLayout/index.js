import { useContext } from "react";
import { TableContext } from "./TableLayout";

export { TableLayout } from "./TableLayout";

export function useTable() {
  const context = useContext(TableContext);

  if (!context) throw new Error("useTable must be used within a TableProvider");

  return context;
}
