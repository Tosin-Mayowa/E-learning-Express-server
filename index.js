const environment=process.env.NODE_ENV ;
const express=require('express');
const morgan=require('morgan');
const userRouter=require('./Routes/userRoutes');
const app=express();


app.use(express.json());
if(environment==='development'){
    app.use(morgan('dev'));
}

app.get('/',(req,res)=>{
    res.send('live');
})
app.use('/api/v1/users',userRouter)

module.exports=app;