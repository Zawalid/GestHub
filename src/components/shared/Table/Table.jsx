import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cloneElement, useRef } from "react";

import { Sort } from "./Sort";
import { useTable } from ".";

export function Table({ actions }) {
  const { columns, rows, isLoading, error } = useTable();
  const table = useRef();
  const [parent] = useAutoAnimate({ duration: 300 });

  const render = () => {
    if (isLoading) {
      const tableHeight = table.current?.getBoundingClientRect().height;
      const skeletonHeight = 40;
      const theadHeight = table.current
        ?.querySelector("thead")
        ?.getBoundingClientRect().height;

      const length = Math.floor((tableHeight - theadHeight) / skeletonHeight);
      return (
        <tbody>
          {Array.from({ length }).map((_, i) => (
            <Skeleton key={i} columns={columns} />
          ))}
        </tbody>
      );
    }
    if (error) {
      return (
        <tbody className="flex  h-[85%] w-full items-center justify-center text-text-tertiary" style={{position : "absolute"}}>
          <tr>
            <td className="font-semibold text-red-600">
              {error.message || "Something went wrong! Please try again."}
            </td>
          </tr>
        </tbody>
      );
    }
    if (rows?.length === 0) {
      return (
        <tbody className="flex  h-[85%] w-full flex-col items-center justify-center text-text-tertiary" style={{position : "absolute"}}>
         <tr>
           <img
             src="/images/no_result.png"
             alt="no results"
             className="w-[200px]"
           />
           <td className="font-semibold">No results found</td>
         </tr>
        </tbody>
      );
    }
    return (
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
    );
  };

  return (
    <div className="relative flex-1 overflow-x-auto" ref={table}>
      <table
        cellPadding={3}
        className="w-full whitespace-nowrap overflow-x-auto  text-left"
      >
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
        {render()}
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

function Skeleton({ columns }) {
  return (
    <tr className="animate-pulse">
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
  );
}
