import { mkConfig, generateCsv, download } from "export-to-csv";
import { jsPDF } from "jspdf"; //or use your library of choice here
import autoTable from "jspdf-autotable";
import { MdDownload } from "react-icons/md";
import { PiFilePdf, PiFileCsv } from "react-icons/pi";
import { Button, DropDown } from "../../ui";
import { useTable } from ".";

const exportAsCsv = (data, config) => {
  const csv = generateCsv(mkConfig(config))(data);
  download(config)(csv);
};

const exportAsPdf = (data, config) => {
  const { filename, tableHeaders } = config;
  const doc = new jsPDF();
  const tableData = data.map((row) => Object.values(row));

  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: "#f0f0f0",
      textColor: "#000000",
    },
    styles: {
      cellPadding: 3,
    },
  });

  doc.save(filename);
  // doc.output("dataurlnewwindow");
};

//* Download
export function Download() {
  const { data, csvConfig, pdfConfig } = useTable();

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
      <DropDown.Option onClick={() => exportAsPdf(data, pdfConfig)}>
        <PiFilePdf />
        PDF
      </DropDown.Option>
      <DropDown.Option onClick={() => exportAsCsv(data, csvConfig)}>
        <PiFileCsv />
        CSV
      </DropDown.Option>
    </DropDown>
  );
}
