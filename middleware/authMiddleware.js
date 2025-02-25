const jwt = require('jsonwebtoken');
const {User}=require('../Models/userModel');
const { asyncErrorHandler } = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
// Middleware to protect routes
const protect =asyncErrorHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log({token});
      
    }
  
    if (!token && req.cookies.jwt) {
      token = req.cookies.jwt; 
  }

    if (!token) {
  
      const  message='You are not logged in!'
            const err=new CustomError(message,401);
           return next(err);
    }
  
    
      // 3. Verify the token
      const decoded = jwt.verify(token, process.env.SECRET_STRING);
  console.log({decoded});
  
      // 4. Check if the user still exists
      const user = await User.findById(decoded.id);
      if (!user) {
        // return res.status(401).json({ status: 'fail', message: 'User no longer exists.' });
        const  message='User no longer exists.'
            const err=new CustomError(message,401);
           return next(err);
      }
  
    console.log(user);
    
      req.user = user;
      next();
    
  }
  )
module.exports = { protect };
