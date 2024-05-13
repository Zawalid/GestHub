import { useTable } from ".";
import { Button, DropDown } from "../../ui";
import { PAGE_LIMIT } from "@/utils/constants";

export function Pagination() {
  const {
    totalItems,
    totalPages,
    page,
    limit,
    onChangeLimit,
    onNextPage,
    onPrevPage,
    isLoading,
    error
  } = useTable();

  if (totalItems === 0 || isLoading || error) return null;

  return (
    <div className="flex gap-3 flex-col sm:flex-row px-6 py-2 sm:items-center border-t border-border mt-auto justify-between">
      <div className="flex items-center flex-1 justify-between flex-col mobile:flex-row gap-3">
      <div className="flex items-center gap-3">
        <Span>Rows per page :</Span>
        <DropDown
          toggler={
            <DropDown.Option
              size="small"
              className=" bg-background-secondary text-text-primary"
            >
              {limit}
            </DropDown.Option>
          }
        >
          {[5,10, 15, 20, 30].map((el) => (
            <DropDown.Option
              key={el}
              size="small"
              className="justify-center"
              isCurrent={el === limit}
              onClick={() => onChangeLimit(el)}
            >
              {el}
            </DropDown.Option>
          ))}
        </DropDown>
      </div>
      <Details />
      </div>
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

function Details() {
  const { totalItems, totalPages, page } = useTable();
  return (
    <p className="text-xs overflow-auto no_scrollbar flex-1  text-center">
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
  );
}

function Span({ children, variable }) {
  return (
    <span
      className={`ml-1 text-xs text-center sm:text-start ${
        variable ? "text-text-primary font-semibold" : "text-text-tertiary"
      }`}
    >
      {children ? children : "-"}
    </span>
  );
}
