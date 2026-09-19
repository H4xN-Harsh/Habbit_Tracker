import jwt from "jsonwebtoken";
export function requireAuth(req,res,next){
    const header = req.headers.authorization||"";
    const token = header.startsWith("Bearer ")?header.slice(7):null;
    if(!token)return res.status(401).json({message:'Access token is missing! '});
    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.sub;
        next();
    }catch{
        return res.status(401).json({message:"Access token is invalid or expire ! "});
    }
}