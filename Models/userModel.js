const {mongoose}=require('mongoose');

const userSchema=new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name cannot be empty"],
        unique: true,
        // validate: {
        //   validator: function(value) {
        //     return typeof value === 'string';
        //   },
        //   message: "Name must be a string, not a number"
        // }
      },
    address:String,
    dateOfBirth:{
        type:Date,
        required:[true,"date of birth cannot be empty"],
    },
    country:{
        type:String,
        required:[true,"country cannot be empty"],
    },
    state:{
        type:String,
        required:[true,"state cannot be empty"],
    },
    matricNo:{
        type:String,
        required:[true,"matric number cannot be empty"],
        unique:true
    },
    phoneNumber:{
        
            type:Number,
            required:[true,"phone number cannot be empty"],
            unique:true
        
    },
    email:{
        type:String,
        required:[true,"email cannot be empty"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"email cannot be empty"],
        trim:true     
    },
    courses:{
        type:[String],
        required:[true,"courses cannot be empty"],
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    },
    isActive:{
        type:Boolean,
        default:false
    },
    lastModified:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:"enable"
    },
});

 module.exports.User=mongoose.model('User', userSchema);