const environment=process.env.NODE_ENV || 'development';
require('dotenv').config({path:`config.env.${environment}`});
const { default: mongoose } = require('mongoose');
const app=require('./index')
const {Movie}=require('./Models/moviesModel')
const {PORT}=process.env;
mongoose.connect(process.env.LOCAL_CONN_STR).then(()=>{
    console.log('connection to mongodb sucessful');
}).catch(err=>{
    console.log('fail to connect to mongodb',err);
    
})

app.listen(PORT || 8000,()=>{
    console.log('server running on port:'+ PORT);
    console.log(__filename);
    
})


