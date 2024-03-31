import { MdDownload } from "react-icons/md";
import { PiFilePdf, PiFileCsv } from "react-icons/pi";
import { Button, DropDown } from "../../ui";

//* Download
export function Download() {
  return (
    <DropDown
      toggler={<Button display="with-icon" type="outline" color="tertiary">
        <MdDownload />
        Download
      </Button>}
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
