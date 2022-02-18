import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from "fs";

export const PDFGenerator = (
  user: string,
  medic: string,
  email: string,
  crm: string,
  specialty: string,
  phone: string,
  address: string,
  prescription: string
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
        text: [` ${user} \n\n`],
        style: "header",
      },
      {
        text: [` ${email} \n\n`, ` ${phone} \n\n`],
        style: "subheader",
      },
      {
        style: "bigger",
        italics: false,
        text: ["Uso ", ` ${prescription} \n\n`, "\n\n"],
      },
      {
        text: [
          `\n\n ${medic} `,
          `\n\n ${crm} `,
          `\n\n ${specialty} `,
          `\n\n ${address} `,
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
