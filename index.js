const environment=process.env.NODE_ENV ;
const express=require('express');
const cookieParser=require('cookie-parser');
const morgan=require('morgan');
const authRouter=require('./Routes/authRouter');
const cors = require('cors'); 
const userRouter=require('./Routes/userRouter');
const tutorRouter=require('./Routes/tutorsRouter');
const { globalErrorHandler } = require('./Controllers/errorController');
const CustomError = require('./utils/CustomError');
const swaggerUi = require('swagger-ui-express');
const { swaggerDocs } = require('./utils/swagger');

const app=express();


const allowedOrigins =process.env.NODE_ENV === 'production'?['http://localhost:5173'] : ['http://localhost:5173', 'http://localhost:5174',
    'http://localhost:5175','https://e-learning-client-sqkb.vercel.app/'];

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

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
if(environment==='development'){
    app.use(morgan('dev'));
}

app.get('/',(req,res)=>{
    res.send('live');
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/users/profile',userRouter);
app.use('/api/v1/tutor',tutorRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.all('*',(req,res,next)=>{
   
    const msg='invalid! url ' + req.originalUrl; 
    const error=new CustomError(msg,404);
    next(error);
})
app.use(globalErrorHandler)
module.exports=app;

