const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const cors = require('cors');

require('dotenv').config();

let { PORT } = process.env;

const mongoose = require('mongoose');
const config  = require ('./config/database');
mongoose.connect(config.database);

const app = express();

app.use(morgan('dev'));
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json({ limit: '50MB' }));
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors());

app.listen(PORT || 3001, () => console.log(`Server on port ${PORT || 3001}`));
