import {OAuth2Client} from "google-auth-library";
import {generateRefreshToken,generateAccessToken,hashToken,setRefreshCookie,clearRefreshCookie} from "./auth.tokens"

import User from "./user.model"
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin= async(req,res)=>{
    try{   
        const {credential} = req.body;
        if(!credential){
           return res.status(400).json({message:"Credential is missing!"})
        }
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        if(!payload?.email_verified){
            return res.status(400).json({message:"google email isn't verified !"});
        }
        let user = await User.findOne({googleId: payload.sub});
        if(!user) user = await User.findOne({email:payload.email});
        if(!user){
            user = await user.create({
                googleId:payload.sub,
                email:payload.email,
                name:payload.name,
                avatar:payload.avatar
            });
        }else if(!user.googleId){
            user.googleid=payload.sub;
            user.avatar = user.avatar||payload.picture
            await user.save();
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        user.refreshTokenHash = hashToken(refreshToken);
        await user.save();
        setRefreshCookie(res.refreshToken);
        return res.status(200).json({
            accessToken,
            user:{id: user._id, name: user.name, email: user.email, avatar: user.avatar}
        })
    }catch(err){
        console.error("google Login error ", err.message)
        return res.status(401);
    }
}
