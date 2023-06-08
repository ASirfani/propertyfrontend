const jwt = require('jsonwebtoken');
const jwtSecret = "abbasaliirfani";
const authMiddleware = (req,res,next)=>{
  const {authorization} = req.headers;
  try{
    const token = authorization.split(" ")[1];
    jwt.verify(token,jwtSecret);
  }catch (error){
    return res.status(403).json({error:'Unauthorized Access'});
  }
  next();
}

module.exports = authMiddleware;
