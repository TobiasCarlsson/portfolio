require('dotenv').config();

const express = require('express');
const app = express();
var https = require("https");
  fs = require('fs');
app.use(express.static('public'));



const options = {
  key: fs.readFileSync("/srv/www/keys/my-site-key.pem"),
  cert: fs.readFileSync("/srv/www/keys/chain.pem")
};

const nodemailer = require('nodemailer');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


app.post('/contact', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
  });
  mailOpts = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: req.body.subject,
    text: `${req.body.name} (${req.body.email}) :
    ${req.body.message}`
  };

  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.status(400).json({ message: 'Something went wrong', error });
    }
    else {
      console.log("Success ")
      res.writeHead(200, {'content-type': 'text/html'});
      fs.createReadStream('public' + '/contact.html').pipe(res);

    }
  });
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
  res.writeHead(200, {'content-type': 'text/html'});
  fs.createReadStream('public' + '/404.html').pipe(res);
});
app.listen(3000, () => {console.log('server is on, 3000')});
