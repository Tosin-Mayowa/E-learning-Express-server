const express=require('express');
const { getAllUsers, getUsersStats,getUser,updateUser,deleteUser,} = require('../Controllers/userController');
const router=express.Router();
const { protect } = require('../middleware/authMiddleware');
router.param('id',(req,res,next,id)=>{
    console.log('intercepting route with route values',id);
    next();
})

router.route('/getUser_stat')
.get(getUsersStats)

router.route('/').get(protect,getAllUsers)


router.route('/:id')
.get(protect,getUser)
.patch(protect,updateUser)
.delete(protect,deleteUser)

module.exports=router;