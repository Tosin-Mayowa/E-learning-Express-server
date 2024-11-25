const express=require('express');
const router=express.Router();
const {registerUser,login, emailVerification, resendLink, forgotPassword, resetPassword, checkAuth, logout}=require('./../Controllers/authController')



router.route('/check').get(checkAuth)
router.route('/register').post(registerUser)
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/verify-email/:token').get(emailVerification);
router.route('/resend-verification').post(resendLink);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').patch(resetPassword);


module.exports=router;