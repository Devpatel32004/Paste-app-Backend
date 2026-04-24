import jwt from "jsonwebtoken"

const isAuthenticated = async (req,res,next) => {
   try {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
   const user = jwt.verify(token, process.env.JWT_SECRET); // user is { id : ...}
    req.user = user;
    next();
   } catch (error) {
    console.log("isAuthenticated error", error);
    return res.status(500).json({message: "Internal server error"});
   }
}

export default isAuthenticated 