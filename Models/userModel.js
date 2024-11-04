const {mongoose}=require('mongoose');
const DateManipulation=require("../utils/DateManipulation");
const bcrypt=require("bcryptjs");
const validator = require('validator');
const crypto = require('crypto');
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
        lowercase: true,
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
        required: [function() { return this.role === 'student' || this.role === 'tutor'; },"This field cannot be empty"]
    },
    dateCreated:{
        type:Date,
        default:Date.now()
    },
    
    gender:String,

    paymentDate:{
        type:Date, 
        default:Date.now()  
    },
    paymentPlan:{
           type:String,
           required: function() { return this.role === 'student'; }, 
        default: function() { return this.role === 'student' ? '2weeks': undefined; }
           
    },
    dueDate:{
        type:Date,
        required: function() { return this.role === 'student'; }, 
        default: function() { return this.role === 'student' ? Date.now() : undefined; }
         

    },
    duration:{
        type:Number,  
    },
    profilePicture:String,
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpires: {
        type: Date,
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
    role: {
        type: String,
        enum: ['admin', 'tutor', 'student','sa'],
        default: 'student'
      },
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

userSchema.virtual('age').get(function(){
    const dateManipulation= new DateManipulation(this.dateOfBirth);
    dateManipulation.calculateAge();
   return dateManipulation.age;
})
userSchema.pre('save',async function(next){
if(!this.isModified('password')) return next();
this.password=await bcrypt.hash(this.password,12);
next();
})
userSchema.pre('findOneAndUpdate',function(next){
    this.set={lastModified:new Date()};
    next();
    })
    userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
        // 'this' refers to the individual user document
        return await bcrypt.compare(candidatePassword, userPassword);
      };
      userSchema.methods.createVerificationToken = function () {
        const token = crypto.randomBytes(32).toString('hex');
    
        this.verificationToken = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');
    
        this.verificationTokenExpires = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes
    
        return token;
    };
 module.exports.User=mongoose.model('User', userSchema);