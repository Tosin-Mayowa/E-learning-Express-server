const express=require('express');
const { getAllUsers,registerUser, getUsersStats,getUser,updateUser,deleteUser,} = require('../Controllers/userController');
const router=express.Router();

router.param('id',(req,res,next,id)=>{
    console.log('intercepting route with route values',id);
    next();
})

router.route('/getUser_stat')
.get(getUsersStats)

router.route('/')
.get(getAllUsers)
.post(registerUser)

router.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser)

module.exports=router;