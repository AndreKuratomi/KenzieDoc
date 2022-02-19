// import nodemailer from 'nodemailer'
// import hbs, {NodemailerExpressHandlebarsOptions} from 'nodemailer-express-handlebars'
// import * as tpath from 'path';
import puppeteer from "puppeteer";

interface WhatsBody {
    user: string;
    phone: string;
    medic: string;
    specialty: string;
    date: string;
    hour: string;
}

export const createWhats = (body: WhatsBody) => {

    const {user, phone, medic, specialty, date, hour} = body;
    
    // const ws = whatsOptions(name, phone, message);

    // console.log(ws)

    // transport.sendMail(email, function (err, info) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log(info);
    //     }
    // });
    return [user, phone, medic, specialty, date, hour]
}

export const sendAppointmentWhatsapp = async (user: string, medic: string, phone: string, specialty: string, date: string, hour: string) => {

  // exemplos de mensagens que podem ser usadas:

  // tomorrow?
  // “Olá, (Nome do Paciente). Não esqueça de sua consulta na clínica
  // Kenzie Doc, amanhã às 8 horas. Responda gratuitamente 1 para confirmar ou 2 para desmarcar.”

  // cancelamento de consulta
  // “Olá, (Nome do Paciente), sua consulta com o Dr. (Nome médico) no dia 10/01 foi cancelada. 
  // Para remarcar entre em contato com a Kenzie Doc.”

  // fazer verificação de sexo para exibir uma mensagem melhor sobre o médico/a que irá atender
  // if sex=feminino ->Dra
  // if sex=masculino ->Dr
  // if sex=outros ->Dr(a)

  const message = `Clínica Kenzie Doc - Confirmação de agendamento

  Olá, *${user}*,

                  Você tem uma consulta agendada com Dr(a) *${medic}* - *_${specialty}_*.
                  Data: *_${date}_*, horário: *_${hour}_*.
                  -- Kenzie Doc`;

  main(user, medic, phone, specialty, date, hour, message)

  // (async ()=>{

  // main()
}

async function main(user: string, medic: string, phone: string | string[], specialty: string, date: string, hour: string, message:string) {

  // let username = "Keila Passos";
  phone = [`+55${phone}`];
  // let mensagem = `Bom dia, ${username}, Bot whatsapp`;
  date = date.split("-").reverse().join("-")
  
  const browser = await puppeteer.launch({headless : false, args: ["--no-sandbox"]});
  const page = await browser.newPage();
  
  await page.goto(`https://web.whatsapp.com/send?phone=${phone[0]}&text=${message} `);
  await delay(40000);
  
  console.log("Conectado com sucesso!");
  console.log("Enviando mensagem");
  
  await page.click("span[data-testid='send']");
  // await delay(20000);
  await delay(10000);
  
  for(let index = 1 ; index < phone.length ; index++){
  await page.goto(`https://web.whatsapp.com/send?phone=${phone[index]}&text=${message} `);
  // await delay(10000);
  await delay(20000);
  console.log("Enviando mensagem");
  await page.click("span[data-testid='send']");
  // await delay(20000);
  await delay(1000);
  
  browser.close()
  }
  
  // })();
  };
  
  function delay(time:any){
      return new Promise(function (resolve){
          setTimeout(resolve,time);
      });
  }

// export const sendCancelationEmail = async (user: string, medic: string, email: string, specialty: string, date: string, hour: string) => {

//     const subject = "Cancelamento de consulta"
        
//     const handlebarOption: NodemailerExpressHandlebarsOptions = {
//         viewEngine: {
//             partialsDir: tpath.resolve(__dirname, '..', 'templates'),
//             defaultLayout: undefined
//         },
//             viewPath: tpath.resolve(__dirname, '..', 'templates')
//         }
                
//     transport.use('compile', hbs(handlebarOption));

//     specialty = specialty.toLowerCase();

//     const message = mailTemplateOptions(
//         email,
//         subject,
//         'cancel.appointment',
//         {
//             user,
//             medic,
//             specialty,
//             date,
//             hour,
//         }
//     )
                    
//     transport.sendMail(message, function (err, info) {
//         if (err) {
//             return console.log(err);
//         } else {
//             console.log(info);
//         }
//     });
// }