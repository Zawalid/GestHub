import { Table } from "@/components/shared/Table";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function TableLayout({
  onAdd,
  onUpdate,
  onDelete,
  ...tableProps
}) {
  const [parent] = useAutoAnimate({ duration: 300 });

  return (
    <div className="flex h-full gap-5 overflow-auto flex-col">
      <Table {...tableProps}>
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-5 justify-between">
          <div className="flex justify-between sm:justify-normal items-center gap-3">
            <Table.Search />
            <div className="flex gap-3">
              <Table.Filter />
              <Table.View />
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <Table.Download />
            <Table.NewRecord onAdd={onAdd} />
          </div>
        </div>
        <div
          className="relative overflow-hidden flex-1 flex flex-col shadow-md rounded-lg border border-border"
          ref={parent}
        >
          <Table.Table
            actions={<Table.Actions onUpdate={onUpdate} onDelete={onDelete} />}
          />
          <Table.TableRecord />
          <Table.Pagination />
          <Table.DeleteConfirmation />
        </div>
      </Table>
    </div>
  );
}
