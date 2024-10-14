module.exports.asyncErrorHandler=(func)=>{
    return function routeHandlerPointer(req,res,next){
        func(req,res,next).catch(err=>next(err));
    }
}