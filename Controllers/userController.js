const {User}=require('../Models/userModel');
const ApiFeatures=require("../utils/ApiFeatures");
const jwt=require('jsonwebtoken');
const { asyncErrorHandler } = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const DateManipulation=require("../utils/DateManipulation");
// Helper function to construct query based on request params

// module.exports.validateInput=(req,res,next)=>{
//     if(req.body.fullName){
//         if(typeof req.body.fullName !=="string"){
        
//             return res.status(400).json({
//                  status:"fail",
//                   message: "fullName must be a string, not a number"
//              })
//     }
//     }
//     next();
// }

module.exports.createSendResponse=(user,res,statuscode)=>{
    const token = jwt.sign({ id: user._id,email:user.email }, process.env.SECRET_STRING, {
        expiresIn: process.env.EXPIRES_IN,
      });
    
      const options={
        httpOnly:true,
        maxAge:3600000,
      }
      if(process.env.NODE_ENV==='production'){
        options.secure=true;
      }
      console.log({token});
      res.cookie('jwt',token,options)


      res.status(statuscode).json({
        status: 'success',
        id:user._id
      });
}
module.exports.getAllUsers=asyncErrorHandler(async (req,res,next)=>{
       
    const apiFeatures=new ApiFeatures(User.find(),req.query)
    .filter()
    .sort()
    .limitField()
    .pagination();

 const users= await apiFeatures.queryModel;
 
      return res.status(200).json({
          status:"success",
          length:users.length,
          data:{
              users
          }
      })  
  
}
)
module.exports.getUser=asyncErrorHandler(async (req,res,next)=>{
  
    const user= await User.findById(req.params.id);
    if(!user){
        const  message="User not found"
    const err=new CustomError(message,404);
   return next(err);
    }
    return res.status(200).json({
        status:"success",
        data:{
            user
        }
    });
  
}
)




module.exports.updateUser=asyncErrorHandler(async (req,res,next)=>{

    let  body={...req.body};
  const dateManipulation=new DateManipulation();
 
  
  
      if(req.body.paymentDate&&req.body.paymentPlan==="2weeks"){
          
          const dueDate=dateManipulation.increaseByTwoWeeks(req.body.paymentDate);
        body={...body,dueDate};
       
      }else if(req.body.paymentDate&&req.body.paymentPlan==="1month"){
         
          const dueDate=dateManipulation.increaseByOneMonth(req.body.paymentDate);
        body={...body,dueDate};
        
      }
      else if(req.body.paymentDate&&req.body.paymentPlan==="2months"){
         
          const dueDate=dateManipulation.increaseByTwoMonths(req.body.paymentDate);
        body={...body,dueDate};
        
      }else if(req.body.paymentDate&&req.body.paymentPlan==="3months"){
         
          const dueDate=dateManipulation.increaseByThreeMonths(req.body.paymentDate);
        body={...body,dueDate};
        
      }else if(req.body.paymentDate&&req.body.paymentPlan==="4months"){
          
          const dueDate=dateManipulation.increaseByFourMonths(req.body.paymentDate);
        body={...body,dueDate};
      
      }else if(req.body.paymentDate&&req.body.paymentPlan==="5months"){
       
          const dueDate=dateManipulation.increaseByFiveMonths(req.body.paymentDate);
        body={...body,dueDate};
        
      }else if(req.body.paymentDate&&req.body.paymentPlan==="6months"){
         
          const dueDate=dateManipulation.increaseBySixMonths(req.body.paymentDate);
        body={...body,dueDate};
        
      }
   
      
      const updatedUser=await User.findByIdAndUpdate(req.params.id,body,{new:true,runValidators:true});
      return res.status(200).json({
          status:"success",
          data:{
              user:updatedUser
          }
      })
  
  })



module.exports.deleteUser=asyncErrorHandler(async (req,res,next)=>{

    const deletedUser= await User.findByIdAndDelete(req.params.id);
if(!deletedUser){
   
    const  message="User not found"
    const err=new CustomError(message,404);
  return  next(err);
}
return res.status(200).json({
    status:"success",
    data:null
})

})

module.exports.getUsersStats=asyncErrorHandler(async (req,res,next)=>{
    
    const apiFeatures=new ApiFeatures(User.find(),req.query);
    let options=apiFeatures.buildQuery(req.query);
    let newOptions={};

    if(req.query.isActive){
       
        
        for(let key in options){
            
            
            if(options[key]==='true'){
            newOptions[key]=true;
            }else{
                newOptions[key]=false;
            }
        }
    }else{
        newOptions={...options}
    }  
    const users=await User.aggregate([ 
        {$unwind:"$courses"},
        {$match: newOptions}
    ]);

    return res.status(200).json({
        status:"success",
        usersCount:users.length,
        data:{
            users
        }
    });
})

module.exports.updateStatus=asyncErrorHandler(async (req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new CustomError('user not found',404))
    }
    let message=req.body.status==='enable'?"account has been activated":"Account has been successfully suspended"
    user.status=req.body.status
    await user.save({ validateBeforeSave: false });
    return res.status(200).json({
        status:"success",
        message
    })
})

module.exports.updatePassword=asyncErrorHandler(async (req,res,next)=>{

})