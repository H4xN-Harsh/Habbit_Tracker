import jwt from "jsonwebtoken";
import crypto from "crypto";
export function generateAccessToken(user){
    return jwt.sign(
        {sub:user._id.toString(),email:user.email},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_EXPIRY||"15m"}
    );
}

export function generateRefreshToken(user){
    return jwt.sign(
        {sub:user._id.toString(),tokenVersion:Date.now()},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_EXPIRY||"7d"}
    )
}
export function hashToken(token){
    return crypto.createHash("sha256").update(token).digest("hex");
}

export function setRefreshCookie(res,token){
    res.cookie("refreshToken",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:process.env.NODE_ENV === "production"?"none":"lax",
        maxAge:Number(process.env.REFRESH_TOKEN_EXPIRY_MS)||7*24*60*60*1000,
        path:"/api/auth",
    })
}
export function clearRefreshCookie(res){
    res.clearCookie("refreshToken",{path:"/api/auth"});
}