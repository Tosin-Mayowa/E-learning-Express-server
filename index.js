const environment=process.env.NODE_ENV ;
const express=require('express');
const morgan=require('morgan');
const authRouter=require('./Routes/authRouter');
const cors = require('cors'); 
const userRouter=require('./Routes/userRouter');
const { globalErrorHandler } = require('./Controllers/errorController');
const CustomError = require('./utils/CustomError');
const app=express();


const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174',
    'http://localhost:5175',];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `This origin is not allowed: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
if(environment==='development'){
    app.use(morgan('dev'));
}

app.get('/',(req,res)=>{
    res.send('live');
})
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users/profile',userRouter);


app.all('*',(req,res,next)=>{
   
    const msg='invalid! url ' + req.originalUrl; 
    const error=new CustomError(msg,404);
    next(error);
})
app.use(globalErrorHandler)
module.exports=app;

