const {mongoose}=require('mongoose');
const DateManipulation=require("../utils/DateManipulation");
var validator = require('validator');
const userSchema=new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name cannot be empty"],
        unique: true,
        validate: {
            validator: function (v) {
             
              return v.split(' ').every(part => validator.isAlpha(part));
            },
            message: "Name cannot contain numbers or special characters",
          },
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
            unique:true,
            validate: {
                validator: function (v) {
                    const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
                  return phoneRegex.test(v);
                },
                message: "Invalid phone numbers",
              },
    },
    tuitionFee:{ 
        type:Number,
        default:0,    
},
deposit:{ 
    type:Number,
    default:0,    
},
balance:{ 
    type:Number,
    default:0,    
},
    email:{
        type:String,
        required:[true,"email cannot be empty"],
        unique:true,
        validate:[validator.isEmail,"Invalid email input"]
    },
    password:{
        type:String,
        required:[true,"cannot be empty cannot be empty"],
        trim:true ,
        minlength:[8,"minimum of 8 characters"],
        unique:false,
        select:false  
    },
    courses:{
        type:[String],
        required:[true,"courses cannot be empty"],
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    },
    paymentDate:{
        type:Date, 
        default:Date.now()  
    },
    paymentPlan:{
           type:String,
           default:'2weeks'
    },
    dueDate:{
        type:Date,
        default:Date.now()  

    },
    duration:{
        type:Number,  
    },
    isActive:{
        type:Boolean,
        default:false
    },
    lastModified:Date,
        
        
    status:{
        type:String,
        default:"enable"
    },
    role:{
        type:String
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

userSchema.virtual('age').get(function(){
    const dateManipulation= new DateManipulation(this.dateOfBirth);
    dateManipulation.calculateAge();
   return dateManipulation.age;
})
userSchema.pre('save',function(next){
this.role='student';
next();
})
userSchema.pre('findOneAndUpdate',function(next){
    this.set={lastModified:new Date()};
    next();
    })
 module.exports.User=mongoose.model('User', userSchema);