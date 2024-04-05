import { useContext } from "react";
import { OperationsContext } from "./Operations";

export function useOperations() {
  const context = useContext(OperationsContext);

  if (!context)
    throw new Error("useOperations must be used within a operationProvider");

  return context;
}
