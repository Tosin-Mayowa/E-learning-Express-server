const environment=process.env.NODE_ENV || 'development';
require('dotenv').config({path:`config.env.${environment}`});
const app=require('./index')
const {PORT}=process.env;

app.listen(PORT || 8000,()=>{
    console.log('server running on port:'+ PORT);
    
})