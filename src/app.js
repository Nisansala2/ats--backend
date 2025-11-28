
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


   
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Loaded' : 'Missing');
console.log('SERVICE_KEY:', process.env.SERVICE_KEY ? 'Loaded' : 'Missing');
console.log('ANON_KEY:', process.env.SUPABASE_ANON_KEY ? 'Loaded' : 'Missing');


app.use((req, res, next) => {
    console.log(` Incomming ${req.method} ${req.path}`);
    next();
});

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const testRouter = require('./routes/testrouter');
app.use('/test', testRouter);

const upload = require('./routes/uploads');
app.use('/api/cv', upload);



module.exports = app;