const {Course}=require("./../Models/courseModel");
const { asyncErrorHandler } = require('../utils/asyncErrorHandler');


module.exports.createCourse=asyncErrorHandler(async (req,res,next)=>{

    const course=await Course.create({...req.body}) ;

    return res.status(201).json({
        status:"success",
        message:"Course created successfully"
    })
})

