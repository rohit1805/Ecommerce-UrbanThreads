const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const prisma = require("../db/db");

function userAuthMiddleware(req, res, next){
    // console.log("hitting user auth middleware");
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(400).json({
            msg : "Wrong authorization token."
        })
    }

    const authHeaderArray = authHeader.split(" ");
    const token = authHeaderArray[1];
    // console.log(token);
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.email = decoded;
        next();
    } catch(err) {
        return res.status(400).json({
            msg : "Invalid authorization token, you are not authenticated."
        })
    }
}

async function adminAuthMiddleware(req, res, next) { 
    // console.log("adminauth middle");
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(400).json({
            msg : "Wrong authorization token."
        })
    }

    const authHeaderArray = authHeader.split(" ");
    const token = authHeaderArray[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded);
        req.email = decoded;

        const admin = await prisma.admin.findUnique({
            where : {
                email : req.email
            }
        })
    
        if(!admin){
            return res.status(401).json({
                msg : "You are not an admin."
            })
        } else {
            next();
        }

        
    } catch(err) {
        return res.status(400).json({
            msg : "Invalid authorization token, you are not authenticated."
        })
    }

}

module.exports = {
    userAuthMiddleware,
    adminAuthMiddleware
}