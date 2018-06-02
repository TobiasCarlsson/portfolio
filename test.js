var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'zoho',
  auth: {
    user: 'contact@tobiasCarlsson.com',
    pass: 'dBJEUU55zN5U'
  }
});

var mailOptions = {
  from: 'contact@tobiasCarlsson.com',
  to: 'test@tobiascarlsson.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
