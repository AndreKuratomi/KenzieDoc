import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from "fs";
import { Patient, Professional } from "../entities";

export const PDFGenerator = (
  patient: Patient,
  prescription: string,
  professional: Professional
) => {
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
        text: [` ${patient.name} \n\n`],
        style: "header",
      },
      {
        text: [` ${patient.email} \n\n`, ` ${patient.phone} \n\n`],
        style: "subheader",
      },
      {
        style: "bigger",
        italics: false,
        text: ["Uso ", ` ${prescription} \n\n`, "\n\n"],
      },
      {
        text: [
          `\n\n ${professional.name} `,
          `\n\n ${professional.council_number} `,
          `\n\n ${professional.specialty} `,
          `\n\n ${professional.address} `,
        ],
        style: "subheader",
        bold: false,
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 14,
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
