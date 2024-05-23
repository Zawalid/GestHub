import { createContext, useContext } from 'react';

export const TableContext = createContext();

export function useTable() {
  const context = useContext(TableContext);

  if (!context) throw new Error('useTable must be used within a TableProvider');

  return context;
}
