import { mkConfig, generateCsv, download } from "export-to-csv";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
  MdDownload,
  PiFilePdf,
  PiFileCsv,
  IoChevronForwardOutline,
} from "../../ui/Icons";
import { Button, DropDown } from "../../ui";
import { useTable } from ".";

const exportAsCsv = (data, config) => {
  const csv = generateCsv(mkConfig(config))(data);
  download(config)(csv);
};

const exportAsPdf = (data, config, headers) => {
  const { filename, tableHeaders } = config;
  const tableData = data.map((row) => Object.values(row));
  const doc = new jsPDF(headers.length > 4 ? "landscape" : "portrait");

  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: "#f0f0f0", textColor: "#000000" },
    styles: { cellPadding: 3 },
  });

  doc.save(`${filename}.pdf`);
  // doc.output("dataurlnewwindow");
};

//* Download
export function Download() {
  const { isLoading } = useTable();

  return (
    <DropDown
      toggler={
        <Button display="with-icon" type="outline" color="tertiary">
          <MdDownload />
          Download
        </Button>
      }
      togglerDisabled={isLoading}
      options={{
        className: "w-40",
      }}
    >
      <DownloadOption type="pdf" icon={<PiFilePdf />} />
      <DownloadOption type="csv" icon={<PiFileCsv />} />
    </DropDown>
  );
}

function DownloadOption({ type, icon }) {
  const { data, rows, csvConfig, pdfConfig, columns } = useTable();

  const downloadPdf = (data) =>
    exportAsPdf(
      data,
      pdfConfig,
      columns.filter((c) => c.visible)
    );

  return (
    <DropDown.NestedMenu
      toggler={
        <DropDown.Option className="justify-between">
          {icon}
          {type.toUpperCase()}
          <IoChevronForwardOutline />
        </DropDown.Option>
      }
      options={{ placement: "right-start" }}
    >
      <DropDown.Option
        onClick={() => {
          type === "pdf" ? downloadPdf(data) : exportAsCsv(data, csvConfig);
        }}
      >
        All Pages
      </DropDown.Option>
      <DropDown.Option
        onClick={() => {
          type === "pdf" ? downloadPdf(rows) : exportAsCsv(rows, csvConfig);
        }}
      >
        This Page
      </DropDown.Option>
    </DropDown.NestedMenu>
  );
}
