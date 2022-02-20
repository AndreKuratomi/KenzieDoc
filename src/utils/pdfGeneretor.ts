import PDFPrinter from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import fs from "fs";

export const PDFGenerator = async (
  name: any,
  email: any,
  phone: any,
  prescription: any,
  medicName: any,
  crm: any,
  specialty: any,
  address: any
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

  const docDefinitions: TDocumentDefinitions = await {
    defaultStyle: { font: "Courier" },
    content: [
      {
        text: [
          `\n\n \n\n`,
          "Clinica ",
          { text: "KenzieDoc", color: "blue" },
          `\n\n`,
        ],
        style: "header",
      },
      // {
      //   image: "../../assets/logo.svg",
      //   width: 50,
      //   height: 50,
      // },
      {
        text: [`\n\n \n\n Nome: ${email} \n\n`],
        style: "subheader",
      },
      {
        text: [`Email: ${name} \n\n`, `Telefone: ${medicName}`],
        style: "subheader",
      },
      { text: [`\n\n \n\n \n\n`] },
      {
        style: "bigger",
        italics: false,
        text: ["Prescrição: ", { text: ` ${specialty}`, italics: true }],
      },
      { text: [`\n\n \n\n \n\n`] },
      {
        text: [
          `\n\n Doutor: ${crm} `,
          `\n\n CRM: ${address} `,
          `\n\n Especialidade: ${prescription}`,
          `\n\n Endereço: ${phone}`,
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
        margin: [20, 0, 40, 0],
      },
      bigger: {
        fontSize: 15,
        background: "#ccc",
        margin: [20, 0, 40, 0],
      },
    },
  };

  const pdfDoc = printer.createPdfKitDocument(docDefinitions);

  pdfDoc.pipe(fs.createWriteStream("src/utils/temp/receita.pdf"));

  pdfDoc.end();
};
