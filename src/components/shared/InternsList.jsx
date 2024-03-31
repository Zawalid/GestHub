import { IoFilter } from "react-icons/io5";
import { MdDownload } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { PiFilePdf, PiFileCsv } from "react-icons/pi";
import { BsTable } from "react-icons/bs";

import { Button, CheckBox, DropDown, SearchInput, Table } from "../ui";

const interns = [
  {
    ID: "1",
    "First Name": "John",
    "Last Name": "Doe",
    Email: "john.doe@example.com",
    Phone: "123-456-7890",
    Sex: "Male",
    Birthday: "1990-01-01",
  },
  {
    ID: "2",
    "First Name": "Jane",
    "Last Name": "Smith",
    Email: "jane.smith@example.com",
    Phone: "098-765-4321",
    Sex: "Female",
    Birthday: "1992-02-02",
  },
  {
    ID: "3",
    "First Name": "Bob",
    "Last Name": "Johnson",
    Email: "bob.johnson@example.com",
    Phone: "111-222-3333",
    Sex: "Male",
    Birthday: "1993-03-03",
  },
  {
    ID: "4",
    "First Name": "Alice",
    "Last Name": "Williams",
    Email: "alice.williams@example.com",
    Phone: "444-555-6666",
    Sex: "Female",
    Birthday: "1994-04-04",
  },
  {
    ID: "5",
    "First Name": "Charlie",
    "Last Name": "Brown",
    Email: "charlie.brown@example.com",
    Phone: "777-888-9999",
    Sex: "Male",
    Birthday: "1995-05-05",
  },
  {
    ID: "6",
    "First Name": "Emily",
    "Last Name": "Davis",
    Email: "emily.davis@example.com",
    Phone: "000-111-2222",
    Sex: "Female",
    Birthday: "1996-06-06",
  },
  {
    ID: "7",
    "First Name": "Frank",
    "Last Name": "Miller",
    Email: "frank.miller@example.com",
    Phone: "333-444-5555",
    Sex: "Male",
    Birthday: "1997-07-07",
  },
  {
    ID: "8",
    "First Name": "Grace",
    "Last Name": "Wilson",
    Email: "grace.wilson@example.com",
    Phone: "666-777-8888",
    Sex: "Female",
    Birthday: "1998-08-08",
  },
  {
    ID: "9",
    "First Name": "Harry",
    "Last Name": "Moore",
    Email: "harry.moore@example.com",
    Phone: "999-000-1111",
    Sex: "Male",
    Birthday: "1999-09-09",
  },
  {
    ID: "10",
    "First Name": "Ivy",
    "Last Name": "Taylor",
    Email: "ivy.taylor@example.com",
    Phone: "222-333-4444",
    Sex: "Female",
    Birthday: "2000-10-10",
  },
];

export default function InternsList() {
  return (
    <div className="flex h-full gap-5 flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div className="flex justify-between sm:justify-normal items-center gap-3">
          <SearchInput placeholder="Search" className="flex-1" />
          <div className="flex gap-3">
            <Filter />
            <View />
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <Download />
          <Button display="with-icon">
            <FaPlus />
            New Intern
          </Button>
        </div>
      </div>
      <div className="relative flex-1 flex flex-col  shadow-md sm:rounded-lg border border-border">
        <div className="overflow-x-auto">
          <Table columns={Object.keys(interns[0])} rows={interns} />
        </div>
        <Pagination />
      </div>
    </div>
  );
}

function Pagination() {
  return (
    <div className="flex gap-3 flex-col sm:flex-row px-6 py-2 sm:items-center border-t border-border mt-auto justify-between">
      <span className="text-xs text-center sm:text-start text-text-tertiary">
        Showing 1 to 10 of 50 entries
      </span>
      <div className="flex justify-between sm:justify-normal gap-2">
        <Button color="tertiary" type="outline" className="w-20" size="small">
          Previous
        </Button>
        <Button color="tertiary" type="outline" className="w-20" size="small">
          Next
        </Button>
      </div>
    </div>
  );
}

function Download() {
  return (
    <DropDown
      toggler={
        <Button display="with-icon" type="outline" color="tertiary">
          <MdDownload />
          Download
        </Button>
      }
      options={{
        className: "w-40",
      }}
    >
      <DropDown.Option>
        <PiFilePdf />
        PDF
      </DropDown.Option>
      <DropDown.Option>
        <PiFileCsv />
        CSV
      </DropDown.Option>
    </DropDown>
  );
}

function Filter() {
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <IoFilter />
        </Button>
      }
      options={{
        className: "w-40",
      }}
    >
      <DropDown.Option className="justify-between">
        Male
        <CheckBox checked={true} />
      </DropDown.Option>
      <DropDown.Option className="justify-between">
        Female
        <CheckBox checked={true} />
      </DropDown.Option>
    </DropDown>
  );
}
function View() {
  return (
    <DropDown
      toggler={
        <Button shape="icon">
          <BsTable />
        </Button>
      }
      options={{
        className: "w-40",
      }}
    >
      {Object.keys(interns[0]).map((key) => (
        <DropDown.Option key={key} className="justify-between">
          {key}
          <CheckBox checked={true} />
        </DropDown.Option>
      ))}
    </DropDown>
  );
}
