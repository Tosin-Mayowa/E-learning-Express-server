const express=require('express');
const { getAllUsers,registerUser, getUser,updateUser,deleteUser,validateInput,} = require('../Controllers/userController');
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
.patch(validateInput,updateUser)
.delete(deleteUser)

module.exports=router;