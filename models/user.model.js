import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        minLength:[3, "Username must be at least 3 characters long"],
        maxLength:[15, "Username must be at most 15 characters long"],
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        minLength:[5, "Email must be at least 5 characters long"],
        maxLength:[50, "Email must be at most 50 characters long"],
    },
    password:{
        type: String,
        required: true,
        trim:true,
        minLength:[8, "Password must be at least 8 characters long"],
        maxLength:[50, "Password must be at most 50 characters long"],
    }
})

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password , 10);
}
userSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password , this.password)
}
userSchema.methods.genetateAuthToken = async function(){
    return await jwt.sign({email: this.email}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

export default mongoose.model("user", userSchema);