const express=require('express');
const { getAllUsers, getUsersStats,getUser,updateUser,deleteUser,  updateStatus,} = require('../Controllers/userController');
const router=express.Router();
const { protect } = require('../middleware/authMiddleware');
const { restrict } = require('../Controllers/authController');
router.param('id',(req,res,next,id)=>{
    console.log('intercepting route with route values',id);
    next();
})

router.route('/stats')
.get(getUsersStats)

router.route('/').get(protect,restrict('admin','sa'),getAllUsers)


router.route('/:id')
.get(protect,getUser)
.patch(protect,restrict('admin','sa'),updateUser)
.delete(protect,restrict('admin','sa'),deleteUser)

router.route('/:id/status') 
    .patch(protect, restrict('admin', 'sa'), updateStatus);

    router.route('/:id/update_password') 
    // .patch(protect,updatePassword);

module.exports=router;