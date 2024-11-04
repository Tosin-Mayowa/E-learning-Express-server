const express=require('express');
const { getAllUsers, getUsersStats,getUser,updateUser,deleteUser,} = require('../Controllers/userController');
const router=express.Router();
const { protect } = require('../middleware/authMiddleware');
const { restrict } = require('../Controllers/authController');
router.param('id',(req,res,next,id)=>{
    console.log('intercepting route with route values',id);
    next();
})

router.route('/getUser_stat')
.get(getUsersStats)

router.route('/').get(protect,restrict('admin','sa'),getAllUsers)


router.route('/:id')
.get(protect,getUser)
.patch(protect,updateUser)
.delete(protect,restrict('admin','sa'),deleteUser)

module.exports=router;