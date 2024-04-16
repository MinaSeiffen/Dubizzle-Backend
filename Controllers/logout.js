const userModel = require("../Models/users");

const handleLogout = async (req, res) => {
  const { token } = req.body;
  console.log(token);

  try {
    const foundUser = await userModel.findOne({ refreshToken: token });

    if (!foundUser) {
      return res.status(201).json({ success: 1, MSG: "Logged out successfully" });
    }

    await userModel.findOneAndUpdate(
      { refreshToken: token },
      { $set: { refreshToken: "logged out" } }
    );

    res.status(201).json({ success: 1, MSG: `Logged out successfully ${foundUser.email}` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { handleLogout };