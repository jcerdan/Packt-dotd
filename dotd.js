const webshot = require('webshot');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const fs = require('fs');
const config = require('./config')

webshot('https://www.packtpub.com/packt/offers/free-learning', config.path + 'packt-deal-of-the-day.png', function(err) {
  // screenshot now saved to google.png
  var transporter = nodemailer.createTransport(smtpTransport({
      host: config.mail.host,
      port: config.mail.port,
      auth: {
        user: config.mail.login,
        pass: config.mail.password,
      }
    }));
    var mailOptions = {
      from: config.mail.From + ' <' + config.mail.login + '>',
      to: config.mail.ToMail,
      subject: 'PACKT Deal Of The Day',
      text: "Deal of the day: https://www.packtpub.com/packt/offers/free-learning",
      attachments: [
        {   // utf-8 string as an attachment
            filename: 'packt-deal-of-the-day.png',
            content: fs.createReadStream(config.path + 'packt-deal-of-the-day.png')
        }
	]
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log(error);
      }
      else{
        console.log('Message sent: ' + info.response);
      	fs.unlinkSync(config.path + 'packt-deal-of-the-day.png');
      	console.log('successfully deleted image');
      }
    });
});
