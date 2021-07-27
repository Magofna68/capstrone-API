const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api', (req, res, next) => {
  res.send('API Status: Running')
});

app.post('/api/email', (req, res, next) => {

  console.log(req.body);

  sgMail
    .setApiKey(process.env.REACT_APP_SENDGRID_API_KEY);

  const msg = {
    to: 'Magofna68@gmail.com',
    from: req.body.email,
    subject: 'New Client: Web Contact',
    text: req.body.message,
  }

  sgMail
    .send(msg)
    .then(() => {

      res.status(200).json({
        success: true
      })
    })
    .catch(error => {
      console.log('error: ', error);
      res.status(401).json({
        success: false
      });
    });
});

app.listen(3000, '0.0.0.0');