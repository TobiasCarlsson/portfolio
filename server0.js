const express = require('express');
const app = express();


const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

require('dotenv').config();

app.use(express.static('public'));

// POST route from contact form
app.post('/contact', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: 'EmailAddress',
        pass: 'Password'
    }
  });
  mailOpts = {
    from: req.body.email,
    to: 'EmailAddress',
    subject: 'Nytt mail från ' + req.body.name,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.status(400).json({ message: 'Something went wrong', error: error });
    }
    else {
      res.status(200).json({ message: 'Success' });
    }
  });
});
app.listen(3000);
