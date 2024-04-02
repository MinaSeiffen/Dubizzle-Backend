const adminModel = require("../Models/adminschema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleAdminLogin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    const foundAdmin = await adminModel.findOne({ username: username });

    if (!foundAdmin) return res.sendStatus(401); // Unauthorized

    const match = await bcrypt.compare(password, foundAdmin.password);
    if (match) {
      // Create JWTs
      const roles = Object.values(foundAdmin.roles);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundAdmin.username,
            roles: roles,
            userType: "admin",
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      const refreshToken = jwt.sign(
        { username: foundAdmin.username, userType: "admin" },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      // Save refreshToken with current admin
      await foundAdmin.updateOne({ refreshToken: accessToken });

      res.cookie("jwt", accessToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res
        .header("token", `Bearer ${accessToken}`)
        .json({ message: "Admin login successful", accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleAdminLogin };
