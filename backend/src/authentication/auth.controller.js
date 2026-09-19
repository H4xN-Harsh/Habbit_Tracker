import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "./user.model";
import { generateAccessToken,generateRefreshToken,hashToken,setRefreshCookie,clearRefreshCookie } from "./auth.tokens";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function googleLogin(req,res){
    try{
        const {credential} = req.body;
        if(!credential)return res.status(400).json({message:"Missing google Credentials!"})
        const ticket = await googleClient.verifyIdToken({
            idToken:credential,
            audience:process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if(!payload?.email_verified){
            return res.status(401).json({message:"Google email not verified! "})
        }
    }
}