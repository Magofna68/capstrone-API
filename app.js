const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendGrid/mail');

const app = express();
// const API_KEY = process.env.REACT_APP_SENDGRID_API_KEY;

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
  // sendGrid.setApiKey('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');
  const SEND_GRID_API_KEY = process.env.REACT_APP_SENDGRID_API_KEY

  // sendGrid.setApiKey({ SEND_GRID_API_KEY });
  sendGrid.setApiKey('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');

  const msg = {
    to: 'Magofna68@gmail.com',
    from: req.body.email,
    subject: 'New Client: Web Contact',
    text: req.body.message,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  sendGrid.send(msg)
    .then(result => {

      res.status(200).json({
        success: true
      })
    })
    .catch(err => {
      console.log('error: ', err);
      res.status(401).json({
        success: false
      });
    });
});

app.listen(3000, '0.0.0.0');