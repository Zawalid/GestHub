// import { useAutoAnimate } from "@formkit/auto-animate/react";
import { cloneElement, useRef } from "react";

import { Sort } from "./Sort";
import { formatToCamelCase } from "@/utils/helpers";
import { useTable } from ".";

export function Table({ actions }) {
  const { columns, rows, isLoading, error } = useTable();
  const table = useRef();
  // const [parent] = useAutoAnimate({ duration: 300 });

  const render = () => {
    if (isLoading) {
      const tableHeight = table.current?.getBoundingClientRect().height;
      const skeletonHeight = 40;
      const theadHeight = table.current
        ?.querySelector("thead")
        .getBoundingClientRect().height;

      const length = Math.floor((tableHeight - theadHeight) / skeletonHeight);
      return (
        <tbody>
          {Array.from({ length }).map((_, i) => (
            <Skeleton key={i} columns={columns} />
          ))}
        </tbody>
      );
    }
    if (error)
      return (
        <tbody className="flex absolute h-[88%] w-full items-center justify-center text-text-tertiary">
          <tr>
            <td>
              {error.message || "Something went wrong! Please try again."}
            </td>
          </tr>
        </tbody>
      );
    if (rows?.length === 0)
      return (
        <tbody className="flex absolute h-[88%] w-full items-center justify-center text-text-tertiary">
          <tr>
            <td>No results found</td>
          </tr>
        </tbody>
      );
    return (
      <tbody className="text-sm h-fit font-medium divide-y divide-border text-text-primary">
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
          <tr>
            {columns
              .filter((c) => c.visible)
              .map(({ label }) => (
                <Column key={label} column={label} />
              ))}
            <Column hide={true} />
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
  return (
    <tr>
      {visibleColumns.map((col) => (
        <td key={col.label} className="px-6 py-4">
          {row[formatToCamelCase(col.label)]}
        </td>
      ))}
      <td className="px-6 py-4">{cloneElement(actions, { row })}</td>
    </tr>
  );
}

function Skeleton({ columns }) {
  return (
    <tr className="animate-pulse">
      {columns
        .filter((c) => c.visible)
        .map(({ label }) => (
          <td key={label}>
            <div className="bg-background-secondary px-6 py-4 rounded-md"></div>
          </td>
        ))}
      <td>
        <div className="bg-background-secondary px-6 py-4 rounded-md"></div>
      </td>
    </tr>
  );
}
