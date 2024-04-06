import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cloneElement, useRef } from "react";

import { Sort } from "./Sort";
import { useTable } from ".";
import {Status} from "@/components/ui/Status";

export function Table({ actions }) {
  const { columns, rows, error } = useTable();
  const table = useRef();
  const [parent] = useAutoAnimate({ duration: 300 });

  if (error)
    return (
      <div className="flex z-10 h-full absolute top-0 w-full items-center justify-center text-text-tertiary">
        <h3 className="font-semibold text-red-600">
          {error.message || "Something went wrong! Please try again."}
        </h3>
      </div>
    );

  return (
    <div className="relative flex-1 overflow-x-auto" ref={table}>
      {rows?.length === 0 && (
        <Status status="noResults" heading="No results found" />
      )}
      <table
        cellPadding={3}
        className="w-full whitespace-nowrap overflow-x-auto  text-left"
      >
        <Skeleton table={table} />
        <thead className="bg-background-secondary ">
          <tr ref={parent}>
            {columns
              .filter((c) => c.visible)
              .map((column) => (
                <Column key={column.displayLabel} column={column} />
              ))}
            {actions && <Column hide={true} />}
          </tr>
        </thead>
        <tbody
          className="text-sm h-fit font-medium divide-y divide-border text-text-primary"
          ref={parent}
        >
          {rows?.map((row) => (
            <Row
              key={row.id}
              row={row}
              visibleColumns={columns.filter((c) => c.visible)}
              actions={actions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Column({ column, hide }) {
  return (
    <th scope="col" className="p-2">
      {hide ? <span className="sr-only">Edit</span> : <Sort column={column} />}
    </th>
  );
}
function Row({ row, visibleColumns, actions }) {
  const [parent] = useAutoAnimate({ duration: 300 });
  return (
    <tr ref={parent}>
      {visibleColumns.map((col) => (
        <td key={col.displayLabel} className="px-6 py-3.5">
          {row[col.key]}
        </td>
      ))}
      {actions && (
        <td className="px-6 py-3.5">{cloneElement(actions, { row })}</td>
      )}
    </tr>
  );
}

function Skeleton({ table }) {
  const { columns, isLoading } = useTable();

  if (!isLoading) return null;

  const tableHeight = table.current?.getBoundingClientRect().height;
  const skeletonHeight = 40;
  const theadHeight = table.current
    ?.querySelector("thead")
    ?.getBoundingClientRect().height;

  const length = Math.floor((tableHeight - theadHeight) / skeletonHeight);
  return (
    <tbody>
      {Array.from({ length }).map((_, i) => (
        <tr className="animate-pulse" key={i}>
          {columns
            .filter((c) => c.visible)
            .map(({ displayLabel }) => (
              <td key={displayLabel}>
                <div className="bg-background-secondary px-6 py-4 rounded-md"></div>
              </td>
            ))}
          <td>
            <div className="bg-background-secondary px-6 py-4 rounded-md"></div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
