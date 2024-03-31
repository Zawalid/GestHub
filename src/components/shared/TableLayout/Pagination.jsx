import { useTable } from ".";
import { Button } from "../../ui";
import { PAGE_LIMIT } from "../../../utils/constants";

export function Pagination() {
  const { totalItems, totalPages, page, onNextPage, onPrevPage } = useTable();

  if (totalItems === 0) return null;

  return (
    <div className="flex gap-3 flex-col sm:flex-row px-6 py-2 sm:items-center border-t border-border mt-auto justify-between">
      <p className="text-xs overflow-auto text-center sm:text-start">
        <Span>Showing</Span>
        <Span variable>{page * PAGE_LIMIT - PAGE_LIMIT + 1}</Span>
        <Span>to</Span>
        <Span variable>
          {page * PAGE_LIMIT > totalItems ? totalItems : page * PAGE_LIMIT}
        </Span>
        <Span>of</Span>
        <Span variable>{totalItems}</Span>
        <Span>records</Span>
        <Span>(Page</Span>
        <Span variable>{page}</Span>
        <Span>of</Span>
        <Span variable>{totalPages}</Span>
        <Span>)</Span>
      </p>
      <div className="flex justify-between sm:justify-normal gap-2">
        <Button
          color="tertiary"
          type="outline"
          className="w-20"
          size="small"
          onClick={onPrevPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          color="tertiary"
          type="outline"
          className="w-20"
          size="small"
          onClick={onNextPage}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function Span({ children, variable }) {
  return (
    <span
      className={`ml-1 text-xs text-center sm:text-start ${
        variable ? "text-text-primary font-semibold" : "text-text-tertiary"
      }`}
    >
      {children}
    </span>
  );
}
