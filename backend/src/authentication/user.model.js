import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        googleId:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        name:{
            type:String,
            require:true,
        },
        avatar:{
            type:String
        },
        refreshTokenHash:{
            type:String,
            default:null
        }
    },{
        timestamps:true
    }
)