
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');



const app = express();
dotenv.config();

app.use(express.json());
const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use((req, res, next) => {
    console.log(` Incomming ${req.method} ${req.path}`);
    next();
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

module.exports = app;