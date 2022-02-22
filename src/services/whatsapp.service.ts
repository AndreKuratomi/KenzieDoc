import puppeteer from "puppeteer";
import { getRepository } from "typeorm";
import { Patient, Professional } from "../entities";

export const sendAppointmentWhatsapp = async (
  user: string,
  medic: string,
  phone: any,
  specialty: string,
  date: any
) => {
  date = date.split("T").join(" ").split(" ");
  let justDate = date[0].split("-").reverse().join("/");
  let justHour = date[1].split("Z").join("");

  const message = `  

      ✅  *Confirmação de agendamento de consulta* %0A%0A
    *Paciente:* ${user} %0A
    *Profissional:* ${medic} %0A
    *Especialidade:* ${specialty} %0A
    *Data:* ${justDate} %0A
    *Hora:* ${justHour} %0A
    *Local:* Clínica Kenzie Doc %0A
    *Endereço:* R. General Mario Tourinho, 1733 %0A%0A
    *Para reagendar/cancelar a consulta, entre em contato com a Kenzie Doc.* %0A
  
  `;

  runWhatsApp(phone, message);
};

export const sendCancelationWhatsapp = async (
  user: string,
  medic: string,
  phone: any,
  specialty: string
) => {
  const message = `  

    ❌  *Aviso de cancelamento de consulta* %0A%0A
    *Informamos o cancelamento da seguinte consulta:* %0A
    *Paciente:* ${user} %0A
    *Profissional:* ${medic} - ${specialty} %0A
    *Para agendar uma nova consulta, entre em contato com a Kenzie Doc.* %0A
    `;

  runWhatsApp(phone, message);
};

function delay(time: any) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

export const sendUpdateWhatsapp = async (
  patientName: string,
  patientPhone: string,
  professionalName: string,
  professionalSpecialty: string,
  date: any
) => {
  date = date.split("T").join(" ").split(" ");
  let justDate = date[0].split("-").reverse().join("/");
  let justHour = date[1].split("Z").join("");

  const message = `  

      ⚠️  *Reagendamento de consulta* %0A%0A
    *Informamos nova data de consulta:* %0A
    *Paciente:* ${patientName} %0A
    *Profissional:* ${professionalName} %0A
    *Especialidade:* ${professionalSpecialty} %0A
    *Data:* ${justDate} %0A
    *Hora:* ${justHour} %0A
    *Local:* Clínica Kenzie Doc %0A
    *Endereço:* R. General Mario Tourinho, 1733 %0A%0A
    *Para reagendar/cancelar a consulta, entre em contato com a Kenzie Doc.* %0A
  
  `;

  runWhatsApp(patientPhone, message);
};

const runWhatsApp = async (phone: any, message: string) => {
  phone = [`+55${phone}`];

  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();

    await page.goto(
      `https://web.whatsapp.com/send?phone=${phone[0]}&text=${message} `
    );
    await delay(20000);

    console.log("Conectado com sucesso!");

    await page.click("span[data-testid='send']");
    await delay(20000);

    for (let index = 1; index < phone.length; index++) {
      await page.goto(
        `https://web.whatsapp.com/send?phone=${phone[index]}&text=${message} `
      );
      await delay(20000);
      console.log("Enviando mensagem");
      await page.click("span[data-testid='send']");
      await delay(20000);
    }
    await browser.close();
    return;
  } catch (err) {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--no-sandbox"],
    });
    console.log(err);
    await browser.close();
    return;
  }
};
