const {User}=require('../Models/userModel');
const ApiFeatures=require("../utils/ApiFeatures");
const DateManipulation=require("../utils/DateManipulation");
// Helper function to construct query based on request params

module.exports.validateInput=(req,res,next)=>{
    if(req.body.fullName){
        if(typeof req.body.fullName !=="string"){
        
            return res.status(400).json({
                 status:"fail",
                  message: "fullName must be a string, not a number"
             })
    }
    }
    next();
}


module.exports.getAllUsers=async (req,res)=>{
    try {
    console.log(req.query,'in');
    
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
    } catch (error) {
        return res.status(404).json({
            status:"fail",
            message:error.message
        })
    }
}

module.exports.getUser=async (req,res)=>{
   try{
    const user= await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({
            status:"Not Found",
           message:"user not found"
        });
    }
    return res.status(200).json({
        status:"success",
        data:{
            user
        }
    });
   }catch(err){
    res.status(404).json({
        status: "fail",
        message:`user with the id ${req.params.id} is not found`
    })
   }
}

module.exports.registerUser=async (req,res)=>{
 try{
const user=await User.create({...req.body}) // or Movie.create({...req.body})
return res.status(201).json({
    status:"success",
    message:"user registered successfully"
})
 }catch(err){
return res.status(400).json({
    status:"fail",
    message:err.message
})
 }
}

module.exports.updateUser=async (req,res)=>{
try {
  let  body={...req.body};
const dateManipulation=new DateManipulation();
console.log(req.body.paymentDate);


    if(req.body.paymentDate&&req.body.paymentPlan==="2weeks"){
        console.log("paymentDate",req.body.paymentDate);
        const dueDate=dateManipulation.increaseByTwoWeeks(req.body.paymentDate);
      body={...body,dueDate};
      console.log({weeklyDue:body});
    }else if(req.body.paymentDate&&req.body.paymentPlan==="1month"){
        console.log("paymentDate",req.body.paymentDate);
        const dueDate=dateManipulation.increaseByOneMonth(req.body.paymentDate);
      body={...body,dueDate};
      console.log({monthlyDue:body});
    }
    else if(req.body.paymentDate&&req.body.paymentPlan==="2months"){
        console.log("paymentDate",req.body.paymentDate);
        const dueDate=dateManipulation.increaseByTwoMonths(req.body.paymentDate);
      body={...body,dueDate};
      console.log({monthlyDue:body});
    }else if(req.body.paymentDate&&req.body.paymentPlan==="3months"){
        console.log("paymentDate",req.body.paymentDate);
        const dueDate=dateManipulation.increaseByThreeMonths(req.body.paymentDate);
      body={...body,dueDate};
      console.log({monthlyDue:body});
    }else if(req.body.paymentDate&&req.body.paymentPlan==="4months"){
        console.log("paymentDate",req.body.paymentDate);
        const dueDate=dateManipulation.increaseByFourMonths(req.body.paymentDate);
      body={...body,dueDate};
      console.log({monthlyDue:body});
    }else if(req.body.paymentDate&&req.body.paymentPlan==="5months"){
        console.log("paymentDate",req.body.paymentDate);
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
}catch(error){
   return res.status(404).json({
        status:"fail",
        message:error.message
    })
}
}

module.exports.deleteUser=async (req,res)=>{
try {
    const deletedUser= await User.findByIdAndDelete(req.params.id);
if(!deletedUser){
    res.status(404).json({
        status:'fail',
        message:"User not found"
    })
}
return res.status(200).json({
    status:"success",
    data:null
})
} catch (error) {
   return res.status(400).json({
    status:'fail',
    message:error.message
   }) 
}
}

module.exports.getUsersStats=async (req,res)=>{
    try {
        const apiFeatures=new ApiFeatures(User.find(),req.query);
        let options=apiFeatures.buildQuery(req.query);
        let newOptions={};

        if(req.query.isActive){
            console.log("i am isActive");
            
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
    } catch (error) {
      return res.status(200).json({
        status:"fail",
        message:error.message
    })
}}