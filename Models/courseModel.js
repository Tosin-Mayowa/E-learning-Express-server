const {mongoose}=require('mongoose');

const courseSchema=new mongoose.Schema({
    course_name: { type: String, required: true },
    description: { type: String },
    category:{ type: String },
    start_date: { type: Date },
    end_date: { type: Date },
    // lecturer: { type: Schema.Types.ObjectId, ref: 'Lecturer' }, 
    // modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }] 
})

module.exports.Course=mongoose.model('Course', courseSchema);