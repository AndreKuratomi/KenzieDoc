import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from "fs";

export const PDFGenerator = () => {
  const fonts = {
    Courier: {
      normal: "Courier",
      bold: "Courier-Bold",
      italics: "Courier-Oblique",
      bolditalics: "Courier-BoldOblique",
    },
  };
  const printer = new PDFPrinter(fonts);

  const docDefinitions: TDocumentDefinitions = {
    defaultStyle: { font: "Courier" },
    content: [
      {
        text: "Nome do paciente)\n\n",
        style: "header",
      },
      {
        style: "bigger",
        italics: false,
        text: [
          "Prescrição do medico ",
          "Prescrição do medico ",
          "Prescrição do medico ",
          "Prescrição do medico. \n\n",
          "Prescrição do medico: ",
          { text: "like here.\n", style: "header" },
          "Prescrição do medico Prescrição do medico.\n\n",
          "Prescrição do medico Prescrição do medico Prescrição do medico. ",
          "Prescrição do medico Prescrição do medico Prescrição do medico ",
          "Prescrição do medico Prescrição do medico Prescrição do medico: ",
          { text: "wow! it works!", style: "header", bold: false },
          "\n\nMake sure to take a look into the sources to understand what's going on here.",
        ],
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      bigger: {
        fontSize: 15,
        italics: true,
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  pdfDoc.pipe(fs.createWriteStream("src/utils/temp/receita.pdf"));

  pdfDoc.end();
};
