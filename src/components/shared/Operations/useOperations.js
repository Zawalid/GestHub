import { createContext, useContext } from 'react';

export const OperationsContext = createContext();

export function useOperations() {
  const context = useContext(OperationsContext);

  if (!context) throw new Error('useOperations must be used within a operationProvider');

  return context;
}
