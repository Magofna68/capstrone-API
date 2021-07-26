const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendGrid/mail');

const app = express();
const API_KEY = process.env.REACT_APP_SENDGRID_API_KEY;

app.use(bodyParser.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'Get, Post, Put, Patch, Delete');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api', (req, res, next) => {
  res.send('API Status: Running')
});

app.post('/api/email', (req, res, next) => {
  sendGrid.setApiKey({ SENDGRID_API_KEY });
})


// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'Magofna68@gmail.com',
  from: req.body.email,
  subject: 'New Client: Web Contact',
  text: req.body.message,
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sendGrid.send(msg);
    .then(result => {

  res.status(200).json({
    success: true
  })
})
  .catch(err => {
    console.log('error: ', err);
    res.status(401).json({
      success: false
    })
  })

app.listen(3000, '0.0.0.0');