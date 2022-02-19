import puppeteer from "puppeteer";

export const sendAppointmentWhatsapp = async (user: string, medic: string, phone: any, specialty: string, date: any) => {

  date = date.split("T").join(" ").split(" ")
  let justDate = date[0].split("-").reverse().join("/")
  let justHour = date[1].split("Z").join("")

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
  
  runWhatsApp(phone, message)

}

export const sendCancelationWhatsapp = async (user: string, medic: string, phone: any, specialty: string) => {
 
  const message = `  

    ❌  *Aviso de cancelamento de consulta* %0A%0A
    *Informamos o cancelamento da seguinte consulta:* %0A
    *Paciente:* ${user} %0A
    *Profissional:* ${medic} - ${specialty} %0A
    *Para agendar uma nova consulta, entre em contato com a Kenzie Doc.* %0A
    `;  
    
  runWhatsApp(phone, message)
}

function delay(time:any){
  return new Promise(function (resolve){
      setTimeout(resolve,time);
  });
}
  
const runWhatsApp = async (phone: string | string[], message:string) => {
  
  phone = [`+55${phone}`];  
  
  const browser = await puppeteer.launch({headless : false, args: ["--no-sandbox"]});
  const page = await browser.newPage();
  
  await page.goto(`https://web.whatsapp.com/send?phone=${phone[0]}&text=${message} `);
  await delay(20000);
  
  console.log("Conectado com sucesso!");
  
  await page.click("span[data-testid='send']");
  await delay(20000);
  
  for(let index = 1 ; index < phone.length ; index++){
    await page.goto(`https://web.whatsapp.com/send?phone=${phone[index]}&text=${message} `);
    await delay(20000);
    console.log("Enviando mensagem");
    await page.click("span[data-testid='send']");
    await delay(20000);
  }
  await browser.close();
  return
};

