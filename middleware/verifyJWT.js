const jwt = require('jsonwebtoken')
const userModel = require('../Models/users'); 

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403); 

      try {
        const foundUser = await userModel.findOne({ email: decoded.UserInfo.email });

        if (!foundUser) return res.status(403);

        req.userId = decoded.UserInfo._id
        req.email = decoded.UserInfo.email;
        next();
      } catch (error) {
        res.status(500).json({ 'message': error.message });
      }
    }
  );
};

module.exports = verifyJWT;
