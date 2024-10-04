const express=require('express');
const { getAllUsers,registerUser, getUsersStats,getUser,updateUser,deleteUser,validateInput,} = require('../Controllers/userController');
const router=express.Router();

router.param('id',(req,res,next,id)=>{
    console.log('intercepting route with route values',id);
    next();
})

router.route('/getUser_stat')
.get(getUsersStats)

router.route('/')
.get(getAllUsers)
.post(validateInput,registerUser)

router.route('/:id')
.get(getUser)
.patch(validateInput,updateUser)
.delete(deleteUser)

module.exports=router;