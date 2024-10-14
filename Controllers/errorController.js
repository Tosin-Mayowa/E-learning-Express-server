const CustomError = require("../utils/CustomError")

const castErrorHandler=(err)=>{
    const msg=`Invalid value ${err.value} for field ${err.path}`
    return new CustomError(msg,400);
}
const devErrors=(res,error)=>{
res.status(error.statusCode).json({
        status:error.status,
        message:error.message,
        stackTrace:error.stack,
        error:error
    })
}
const productionErrors=(res,error)=>{
   
    if(error.isOperational){
        res.status(error.statusCode).json({
            status:error.status,
            message:error.message
        })
    }else{
        res.status(500).json({
            status:'error',
            message:'something went wrong try again later'
        })
    }
}
module.exports.globalErrorHandler=(error,req,res,next)=>{
    error.statusCode=error.statusCode||500;
    error.status=error.status||'error';
    if(process.env.NODE_ENV==='development'){
        devErrors(res,error)
    }else if(process.env.NODE_ENV==='production'){
      let err={...error,name:error.name};
        
        if(err.name==='CastError'){
            err=castErrorHandler(err)
        }
productionErrors(res,err);
    }

    }
