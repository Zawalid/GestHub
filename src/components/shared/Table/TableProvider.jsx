import { useEffect, useState } from 'react';
import { Table } from './Table';
import { Search } from './Search';
import { View } from './View';
import { Pagination } from './Pagination';
import { Download } from './Download';
import { TableRecord } from './TableRecord';
import { Actions } from './Actions';
import { NewRecord } from './NewRecord';
import { Selected } from './Selected';
import { TableContext } from './useTable';
import { useMethods } from '@/hooks/useMethods';
import { useNavigateState } from '@/hooks/useNavigateWithQuery';

/**
 * TableProvider component.
 *
 * @component
 *
 * @param {Object} props - Props that get passed to the TableProvider component.
 * @param {React.ReactNode} props.children - The children nodes of the TableProvider component.
 * @param {Array} props.data - The initial data for the TableProvider component.
 * @param {string} props.resourceName - The name of the resource.
 * @param {boolean} props.isLoading - If true, the TableProvider component is in a loading state.
 * @param {Object} props.error - The error object, if any error occurred.
 * @param {Array} props.columns - The columns for the table.
 * @param {Array} props.formFields - The fields for the form.
 * @param {Object} props.formDefaults - The default values for the form.
 * @param {Array} props.fieldsToSearch - The fields to search the data in.
 * @param {Object} props.downloadOptions - The options for downloading the data.
 * @param {boolean} props.displayAllData - If true, all data is displayed.
 *
 * @returns {React.ElementType} Returns a TableContext.Provider component with the TableProvider component.
 */
export function TableProvider({
  children,
  data,
  resourceName,
  isLoading,
  error,
  columns,
  // : tableColumns
  formFields,
  selectedOptions: defaultSelectedOptions,
  formDefaults,
  fieldsToSearch,
  defaultSortBy = 'id',
  defaultDirection = 'desc',
  downloadOptions,
  displayAllData,
}) {
  // const [columns, setColumns] = useState(tableColumns);
  const [hiddenColumns, setHiddenColumns] = useState(columns.filter((c) => !c.visible).map((c) => c.displayLabel));
  const [selected, setSelected] = useState([]);
  const [formOptions, setFormOptions] = useState({
    defaultValues: formDefaults,
    fields: formFields,
    onSubmit: () => {},
    resetToDefault: true,
    gridLayout: true,
    submitButtonText: '',
    heading: '',
    isOpen: false,
    type: 'create',
  });
  const [selectedOptions, setSelectedOptions] = useState({
    isOpen: false,
    actions: defaultSelectedOptions?.actions || [],
    deleteOptions: defaultSelectedOptions?.deleteOptions,
  });
  const {
    query,
    page,
    limit,
    sortBy,
    direction,
    filters,
    setFilters,
    onSearch,
    onPaginate,
    onChangeLimit,
    onSort,
    onFilter,
    appliedFiltersNumber,
  } = useMethods({
    defaultSortBy,
    defaultDirection,
  });
  const state = useNavigateState();

  // Variables
  const rows = data?.search(query, fieldsToSearch).customFilter(filters, 'AND').customSort(sortBy, direction, columns);

  const totalItems = data?.length;
  const totalPages = Math.ceil(totalItems / limit);

  const excludedFields = columns.filter((c) => hiddenColumns.includes(c.displayLabel)).map((c) => c.displayLabel);

  const csvConfig = {
    filename: downloadOptions?.csvFileName || resourceName,
    columnHeaders: columns.filter((c) => !excludedFields.includes(c.displayLabel)),
  };
  const pdfConfig = {
    filename: downloadOptions?.pdfFileName || resourceName,
    tableHeaders: columns.map((c) => c.displayLabel).filter((c) => !excludedFields.includes(c)),
  };

  const confirmOptions = {
    message: `Are you sure you want to delete this ${resourceName.toLowerCase()} ?`,
    title: `Delete ${resourceName}`,
    confirmText: 'Delete',
  };

  useEffect(() => {
    const newFilters =
      columns
        .filter((col) => col.filter && col.filter.length > 0)
        .reduce((acc, col) => {
          acc[col.key] = col.filter;
          return acc;
        }, {}) || {};
    if (Object.keys(newFilters).length !== Object.keys(filters).length || state?.filter) {
      setFilters(newFilters);
    }
  }, [columns, filters, setFilters, state?.filter]);

  // Handlers

  const onChangeView = (column, showAll) => {
    if (showAll) return setHiddenColumns([]);
    setHiddenColumns((prev) => (prev.includes(column) ? prev.filter((c) => c !== column) : [...prev, column]));
  };

  const showForm = (options) => {
    setFormOptions((prev) => ({
      ...prev,
      ...options,
      close: () => {
        setFormOptions((prev) => ({
          ...prev,
          isOpen: false,
          defaultValues: formDefaults,
          heading: '',
          submitButtonText: '',
        }));
      },
    }));
  };

  const onSelect = (id, isAll) => {
    setSelected((prev) => {
      const selected = prev.includes(id) ? (isAll ? prev : prev.filter((s) => s !== id)) : [...prev, id];
      setSelectedOptions((prev) => ({
        ...prev,
        isOpen: selected.length > 0,
        onClose: () => setSelectedOptions((p) => ({ ...p, isOpen: false })),
      }));
      return selected;
    });
  };

  // Context value
  const context = {
    // data
    data,
    resourceName,
    isLoading,
    error,
    // table
    // tableColumns,
    columns,
    rows: displayAllData ? rows : rows?.paginate(page, limit),
    hiddenColumns,
    disabled: isLoading || error || data?.length === 0 || (page > totalPages && !query && !appliedFiltersNumber('all')),
    // Selection
    selected,
    isSelecting: selected.length > 0,
    selectedOptions,
    onSelect,
    // search
    query,
    onSearch,
    // filter
    filters,
    appliedFiltersNumber,
    onFilter,
    // pagination
    totalItems,
    totalPages,
    page,
    limit,
    onChangeLimit,
    onPaginate,
    // view
    onChangeView,
    // sort
    sortBy,
    direction,
    onSort: (column, direction) => onSort(column, direction),
    // download
    csvConfig,
    pdfConfig,
    // other
    formOptions,
    formFields,
    showForm,
    confirmOptions,
  };

  return <TableContext.Provider value={context}>{children}</TableContext.Provider>;
}

TableProvider.Table = Table;
TableProvider.Search = Search;
TableProvider.View = View;
TableProvider.Download = Download;
TableProvider.Pagination = Pagination;
TableProvider.NewRecord = NewRecord;
TableProvider.TableRecord = TableRecord;
TableProvider.Actions = Actions;
TableProvider.Selected = Selected;
