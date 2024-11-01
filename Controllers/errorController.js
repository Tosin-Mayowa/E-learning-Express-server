const CustomError = require("../utils/CustomError")

const castErrorHandler=(err)=>{
    const msg=`Invalid value ${err.value} for field ${err.path}`
    return new CustomError(msg,400);
}

const duplicateErrorHandler=(err)=>{
    const msg=`The user with fullname: ${err.keyValue.fullName} already exist, duplicate field not allowed`
    return new CustomError(msg,400);
}
const validationErrorHandler=(err)=>{
    const errors=Object.values(err.errors).map(item=>item.message);
    const errorMessage=errors.join('. ');
    const msg=`Invalid user input data:${errorMessage}`
    return new CustomError(msg,400);
}
const devErrors=(res,error)=>{
return res.status(error.statusCode).json({
        status:error.status,
        message:error.message,
        stackTrace:error.stack,
        error:error
    })
}
const productionErrors=(res,error)=>{
   
    if(error.isOperational){
     return   res.status(error.statusCode).json({
            status:error.status,
            message:error.message
        })
    }else{
      return  res.status(500).json({
            status:'error',
            message:'something went wrong try again later'
        })
    }
}
module.exports.globalErrorHandler=(error,req,res,next)=>{
    error.statusCode=error.statusCode||500;
    error.status=error.status||'error';
    console.log(process.env.NODE_ENV);

    
    if(process.env.NODE_ENV==='development'){
        devErrors(res,error)
    }else if(process.env.NODE_ENV==='production'){
    //   let err={...error,name:error.name}; prefer using the error object directly
        console.log(error.name);
        console.log(error.code);
        
        if(error.name==='CastError'){
            error=castErrorHandler(error)
        }
        if(error.name==='ValidationError'){

            error=validationErrorHandler(error);
        }
        if(error.code===11000){
           
            error=duplicateErrorHandler(error)
        }
        
       productionErrors(res,error);
    }

    }
