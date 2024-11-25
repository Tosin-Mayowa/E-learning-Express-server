const express=require('express');
const router=express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createCourse } = require('../Controllers/courseControllers');
const { restrict } = require('../Controllers/authController');

router.route('/:id/course').post(protect,restrict("tutor"),createCourse)

module.exports=router;