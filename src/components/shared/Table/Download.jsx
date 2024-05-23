import { mkConfig, generateCsv, download } from 'export-to-csv';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { MdDownload, PiFilePdf, PiFileCsv, IoChevronForwardOutline } from '../../ui/Icons';
import { Button, DropDown } from '../../ui';
import { useTable } from './useTable';

const exportAsCsv = (data, config, page) => {
  const filename = page ? `${config.filename}-page-${page}` : config.filename;
  const csv = generateCsv(mkConfig({ ...config, filename }))(data);
  download({ ...config, filename })(csv);
};

const exportAsPdf = (data, config, headers, page) => {
  const { filename, tableHeaders } = config;

  const tableData = data
    // Filter the visible columns
    .map((el) => Object.fromEntries(Object.entries(el).filter(([key]) => headers.map((c) => c.key).includes(key))))
    // Sort the columns same as the headers
    .map((el) =>
      headers.reduce((acc, h) => {
        acc[h.key] = el[h.key];
        return acc;
      }, {})
    )
    // Format the columns that needs to be formatted
    .map((el) =>
      Object.keys(el).reduce((acc, k) => {
        const format = headers.find((h) => h.key === k).format; // value,id,isDownload
        acc[k] = format ? format(el[k], null, true) : el[k];
        return acc;
      }, {})
    )
    .map((row) => Object.values(row));

  const doc = new jsPDF(headers.length > 4 ? 'landscape' : 'portrait');

  autoTable(doc, {
    head: [tableHeaders],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: '#f0f0f0', textColor: '#000000' },
    styles: { cellPadding: 3 },
  });
  const name = page ? `${filename}-page-${page}.pdf` : filename;
  doc.save(name);
  // doc.output('dataurlnewwindow');
};

//* Download
export function Download() {
  const { disabled} = useTable();

  return (
    <DropDown
      toggler={
        <Button display='with-icon' type='outline' color='tertiary'>
          <MdDownload />
          Download
        </Button>
      }
      togglerDisabled={disabled}
      options={{
        className: 'w-40',
      }}
    >
      <DownloadOption type='pdf' icon={<PiFilePdf />} />
      <DownloadOption type='csv' icon={<PiFileCsv />} />
    </DropDown>
  );
}

function DownloadOption({ type, icon }) {
  const { data, rows, csvConfig, pdfConfig, columns, page } = useTable();

  const downloadPdf = (data, page) =>
    exportAsPdf(
      data,
      pdfConfig,
      columns.filter((c) => c.visible),
      page
    );
  const downloadCsv = (data, page) => exportAsCsv(data, csvConfig, page);

  return (
    <DropDown.NestedMenu
      toggler={
        <DropDown.Option className='justify-between'>
          {icon}
          <span className='text-start'>{type.toUpperCase()}</span>
          <IoChevronForwardOutline />
        </DropDown.Option>
      }
      options={{ placement: 'right-start' }}
    >
      <DropDown.Option
        onClick={() => {
          type === 'pdf' ? downloadPdf(data) : downloadCsv(data);
        }}
      >
        All Pages
      </DropDown.Option>
      <DropDown.Option
        onClick={() => {
          type === 'pdf' ? downloadPdf(rows, page) : downloadCsv(rows, page);
        }}
      >
        This Page
      </DropDown.Option>
    </DropDown.NestedMenu>
  );
}
