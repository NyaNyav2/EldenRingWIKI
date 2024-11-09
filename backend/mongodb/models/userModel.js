import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const bookmarkSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    productType: {
      type: String,
      enum: ["ashes", "armors", "sorceries", "spirits", "talismans", "weapons"],
      required: true,
    },
  });

const userInfo = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    userGender:{
        type:String,
        enum:["Male","Female","Other"]
    },
    userAge:{
        type:Number,
        required:true,
    },
    userPhoto:{
        type:String,
        
    }

})
// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bookmarks: [bookmarkSchema],
    info:[userInfo],
});

// Define the `signup` static method
userSchema.statics.signup = async function (email, password) {
    
    if(!email || !password){
        throw Error('All filed must be fill')
    }
    if(!validator.isEmail(email)){
        throw Error('Email only')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password too weak')
    }
    
    // Check if the email already exists
    const existingUser = await this.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and return the new user
    const user = await this.create({ email, password: hashedPassword });
    return user;
};


// login
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All filed must be fill')
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Incorrect email');
    }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('incorrect password')
    }
    return user
}
// Create and export the model
const User = mongoose.model('users', userSchema);  // Use uppercase for the model name
export default User;