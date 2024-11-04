const {User}=require('../Models/userModel');
const ApiFeatures=require("../utils/ApiFeatures");
const { asyncErrorHandler } = require('../utils/asyncErrorHandler');
const jwt=require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const DateManipulation=require("../utils/DateManipulation");
const sendEmail = require('../utils/EmailSender');
const crypto = require('crypto');

module.exports.restrict=(...role)=>{
  return (req,res,next)=>{
    if(!role.includes(req.user.role)){
      const error= new CustomError('You do not have access to perform this action',403);
      next(error);
    }
    next();
  }
}
module.exports.registerUser=asyncErrorHandler(async (req,res,next)=>{
    console.log('body',req.body);
    
    const user=await User.create({...req.body}) 

        const token = user.createVerificationToken();
        await user.save({ validateBeforeSave: false });

        const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${token}`;
        const message = `Please click on the following link to verify your email: ${verificationUrl}`;

        await sendEmail({
            email: user.email,
            subject: 'Email Verification',
            message,
        });






    return res.status(201).json({
        status:"success",
        message:"user registered successfully"
    })
     
    })




    module.exports.login=asyncErrorHandler(async (req,res,next)=>{
        const {email,password}=req.body;
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            // return res.status(401).json({ status: 'fail', message: 'Invalid email or password' });
            const  message='Invalid email or password'
            const err=new CustomError(message,401);
           return next(err);
        }
  // Check if the user is verified
  if (!user.isVerified) {
    const  message='Please verify your email before signing in.';
    const err=new CustomError(message,403);
   return next(err);

  }
          
  const token = jwt.sign({ id: user._id,email:user.email }, process.env.SECRET_STRING, {
    expiresIn: process.env.EXPIRES_IN,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
    })
  

   module.exports.emailVerification =asyncErrorHandler(async (req, res,next) => {
      
        const token = req.params.token;
    
        // Hash the token to match what is stored in the database
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    
        // Find user with the token that hasn't expired
        const user = await User.findOne({
          verificationToken: hashedToken,
          verificationTokenExpires: { $gt: Date.now() },
        });
     
        if (!user) {
          //if email verification link expired after 10mins
          return res.status(400).redirect(`${req.protocol}://${req.get('host')}/expired-verification`);
        }
    
        // Verify user
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpires = undefined;
        await user.save();
    
        // Redirect to frontend success page
        res.redirect(`${req.protocol}://${req.get('host')}/email-verified`);
      
    });
    
   module.exports.resendLink= asyncErrorHandler(async (req, res,next) => {
      const { email } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user || user.isVerified) {
          const  message= 'User not found or already verified.';
          const err=new CustomError(message,400);
         return next(err);
        }
  
      // Generate a new verification token
      const token = user.createVerificationToken(); // Assuming this method exists in your User model
      await user.save({ validateBeforeSave: false });
  
      // Send verification email
      const verificationUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/verify-email/${token}`;
      
      const message = `Verify your email by clicking this link: ${verificationUrl}`;
  
     
          await sendEmail({
              email: user.email,
              subject: 'Email Verification',
              message,
          });
  
          return res.status(200).json({ status: 'success', message: 'Verification link sent!' });
     
  })
