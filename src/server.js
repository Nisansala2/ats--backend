
require('dotenv').config();
const app = require('./app');


const port = process.env.PORT ;
console.log("ENV PORT =", process.env);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});