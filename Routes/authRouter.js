const express=require('express');
const router=express.Router();
const {registerUser,login, emailVerification, resendLink, forgotPassword, resetPassword, checkAuth, logout}=require('./../Controllers/authController')


/**
 * @swagger
 * /auth/check:
 *   get:
 *     summary: Check authentication status
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *       401:
 *         description: Unauthorized
 */
router.route('/check').get(checkAuth)


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               address:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               country:
 *                 type: string
 *               state:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               gender:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *                
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.route('/register').post(registerUser)

router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/verify-email/:token').get(emailVerification);
router.route('/resend-verification').post(resendLink);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').patch(resetPassword);


module.exports=router;