const express = require('express');
const bodyParser = require('bodyParser');
const cors = require('cors');
const sendGrid = require('@sendGrid/mail');

const app = express();