import {VerifyToken} from "../auth/jwt.js"

export default function AuthMiddleware(req,res,next){
    // Prefer cookie token for browser sessions; fallback to Bearer for API clients.
    const bearer = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;
    const token = req.cookies?.token || bearer;

    if(!token){
        return res.status(401).json({message:"missing auth token"})
    }

    try{
        const decoded = VerifyToken(token);
        console.log("decoded token",decoded)
        req.user = decoded;
        next()
    }catch(error){
        console.log("authontication fails",error)
        return res.status(401).json({message:"invalid credentials ",error:error.message})
    }
}