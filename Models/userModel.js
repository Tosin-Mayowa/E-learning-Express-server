const {mongoose}=require('mongoose');
const DateManipulation=require("../utils/DateManipulation");
const userSchema=new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Name cannot be empty"],
        unique: true,
       
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
        unique:true
    },
    password:{
        type:String,
        required:[true,"cannot be empty cannot be empty"],
        trim:true ,
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
    lastModified:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default:"enable"
    },
},{
    toJSON:{virtuals:true}
});

userSchema.virtual('age').get(function(){
    const dateManipulation= new DateManipulation(this.dateOfBirth);
    dateManipulation.calculateAge();
   return dateManipulation.age;
})

 module.exports.User=mongoose.model('User', userSchema);