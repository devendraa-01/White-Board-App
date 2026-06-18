const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique:true,
    },
    password : {
        type:String,
        trim: true,
        maxlength: 500
    },
    isVerified: { 
        type: Boolean,
        default: false
    }, // New: Tracks email verification
    verificationToken: { 
        type: String
    }, // New: Stores the token sent via email
    
},{
    timestamps: true,
    collection: 'Users'
});

userSchema.statics.createUser = async function (name,email,password) {
    try {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const user = new this(
            {
                name,
                email,
                password:hashedPassword
            }
        );

        return user.save();
    } 
    catch (error) {
        throw new Error("Error creating user" + error.message);
    }
}

userSchema.statics.loginUser = async function (email,password) {
    try {
        const user = await this.findOne({email});
        
        if(!user){
            throw new Error("User not found");
        }
    
        const match = await bcrypt.compare(password,user.password);

        if(!match){
            throw new Error("Invalid passowrd");
        }

        return user;
    }
    catch (error) {
        throw new Error("Login failed: "+ error.message);
    }  
}

userSchema.statics.getUser = async function(email){
    try {
        const user  = await this.findOne({email});
        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const userModel = mongoose.model('Users',userSchema);

module.exports = userModel;