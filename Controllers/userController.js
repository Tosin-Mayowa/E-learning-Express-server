const {User}=require('../Models/userModel');
const ApiFeatures=require("../utils/ApiFeatures");
// Helper function to construct query based on request params

module.exports.validateInput=(req,res,next)=>{
    if(typeof req.body.fullName !=="string"){
       return res.status(400).json({
            status:"fail",
             message: "fullName must be a string, not a number"
        })
    }
    next();
}


module.exports.getAllUsers=async (req,res)=>{
    try {
    
      const apiFeatures=new ApiFeatures(User.find(),req.query);
 
    
        
       
        if(req.query.sort){
           
        }
         
        const users=await query;
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
const user=await User.create(req.body) // or Movie.create({...req.body})
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
    const updatedUser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
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