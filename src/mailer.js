const nodemailer = require("nodemailer");

function setup() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'supfhesenov@gmail.com',
      pass: 'Ferman.Hesenov'
    }
  });
}

module.exports = function sendEmail(data) {
  const tranport = setup();

  const email = {
    from: `fermanhesenov.az saytindan yeni mektub`,
    to: 'dr_farman59@mail.ru',
    subject: data.theme,
    text: '',
    html: ` 
      <p> ${data.text} </p> <br/><br/>

      <small> ${data.fio} - ${data.phone} - ${data.email} </small>
    `,
  };

  tranport.sendMail(email);
}