const environment=process.env.NODE_ENV ;
const express=require('express');
const morgan=require('morgan');
const userRouter=require('./Routes/userRoutes');
const { globalErrorHandler } = require('./Controllers/errorController');
const CustomError = require('./utils/CustomError');
const app=express();


app.use(express.json());
if(environment==='development'){
    app.use(morgan('dev'));
}

app.get('/',(req,res)=>{
    res.send('live');
})
app.use('/api/v1/users',userRouter)
app.all('*',(req,res,next)=>{
    // return res.status(404).json({
    //     status:'fail',
    //     message:'invalid! url ' + req.originalUrl 
    // })
    const msg='invalid! url ' + req.originalUrl; 
    const error=new CustomError(msg,404);
    next(error);
})
app.use(globalErrorHandler)
module.exports=app;