
//this is my project setup file
mkdir ats-backend
cd ats-backend
npm init -y
# install dependencies
npm i express mongoose dotenv multer aws-sdk bcrypt jsonwebtoken helmet cors express-rate-limit openai pdf-parse mammoth node-fetch bullmq ioredis
# dev
npm i -D nodemon jest supertest


// set port
so want to add server.js root of the project and want to install require('dotenv').config(); in top of the file and want to install in terminal and give port in env file not put spaces

//set user regester login 
create user model in user.js
create login and signup funtion in authcontrole.js
and create routes in authRoutes
after add in appjs  
const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

soo i faced bugs stuck in postman sending request becuse not call const cors = require('cors');
app.use(cors()); funtion 
so after call this it work correctly 

so testing purpose create get request so after checking my reqest work add this 
app.use((req, res, next) => {
    console.log(` Incomming ${req.method} ${req.path}`);
    next();
});

in  check post request http://localhost:4000/auth/login
{
    "message": "Login successful",
    "user": {
        "_id": "6927030b2a5a11992f62ba5e",
        "email": "test@gmail.com",
        "password": "2233",
        "name": "heeee",
        "__v": 0
    }
}
http://localhost:4000/auth/register

{
    "email":"test@gmail.com",
    "name":"heeee",
    "password":"2233"
}
{
    "message": "Registered successfully",
    "user": {
        "email": "test@gmail.com",
        "password": "2233",
        "name": "heeee",
        "_id": "6927030b2a5a11992f62ba5e",
        "__v": 0
    }
}

// add bcrypt and jwt authantivation 
insatall this pacages npm install bcrypt jsonwebtoken

add pashword hashing and jwt token  add this 
const hashedPassword = await bcrypt.hash(password, 10);
 
 soo i faced the error becuse i change the inthe save user funcuionlities
 // Create user
    const user = await User.create({
      email,
      name,
      password: hashedPassword
    });
soo in error i add passwordhashed inseated password it gives error becuse my user model use passwrd 


i 