
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');


const app = express();
dotenv.config();

app.use(express.json());
app.use(require ('cors'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

module.exports = app;