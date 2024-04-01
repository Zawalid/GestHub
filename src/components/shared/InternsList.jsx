import { TableLayout } from "./TableLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function InternsList() {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div className="flex h-full gap-5 flex-col">
      <TableLayout>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-5 justify-between">
          <div className="flex justify-between sm:justify-normal items-center gap-3">
            <TableLayout.Search />
            <div className="flex gap-3">
              <TableLayout.Filter />
              <TableLayout.View />
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <TableLayout.Download />
            <TableLayout.NewRecord />
          </div>
        </div>
        <div
          className="relative overflow-hidden flex-1 flex flex-col shadow-md rounded-lg border border-border"
          ref={parent}
        >
          <TableLayout.Table />
          <TableLayout.TableRecord />
          <TableLayout.Pagination />
          <TableLayout.DeleteConfirmation />
        </div>
      </TableLayout>
    </div>
  );
}
