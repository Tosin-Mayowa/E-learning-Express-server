const express=require('express');
const router=express.Router();
const {registerUser,login, emailVerification, resendLink}=require('./../Controllers/authController')



router.route('/register').post(registerUser)
router.route('/login').post(login);
router.route('/verify-email/:token').get(emailVerification);
router.route('/resend-verification').post(resendLink);
module.exports=router;