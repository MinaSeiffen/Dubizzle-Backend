const userModel = require("../Models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const handleLoginOrRegister = async (req, res) => {
  const { email } = req.body;
  console.log(email)

  if (!email) {
    return res.status(403).json({ message: "email is required" });
  }

  try {
    let foundUser = await userModel.findOne({ email });

    if (!foundUser) {
      const newUser = new userModel({
        email : email,
        profile: { name: email.split("@")[0].toLowerCase() },
        roles: { User: 2001 },
      });

      await newUser.save();
      foundUser = newUser; 
    }

    // Create JWTs
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          _id:foundUser._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await userModel.findOneAndUpdate(
      { email: foundUser.email },
      { $set: { refreshToken: accessToken } }
    );

    res.json({ message: "Login successful", accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.sendStatus(404); // Not Found

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.sendStatus(401); // Unauthorized

    const roles = Object.values(user.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: user.email,
          _id:user._id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await userModel.findOneAndUpdate(
      { email: user.email },
      { $set: { refreshToken: accessToken } }
    );

    res.status(200).json({ accessToken, email: user.email });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLoginOrRegister , handleLogin };
