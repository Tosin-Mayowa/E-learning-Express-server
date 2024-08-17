const express=require('express');
const { getAllUsers,registerUser, getUser } = require('../Controllers/userController');
const router=express.Router();

router.param('id',(req,res,next,id)=>{
    console.log('intercepting route with route values',id);
    next();
})

router.route('/')
.get(getAllUsers)
.post(registerUser)

router.route('/:id')
.get(getUser)


module.exports=router;