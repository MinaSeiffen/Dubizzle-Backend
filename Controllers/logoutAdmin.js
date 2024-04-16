const adminModel = require("../Models/adminschema");

const handleAdminLogout = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    console.log("No jwt cookie found");
    return res.status(204); // No content
  }

  try {
    const foundAdmin = await adminModel.findOne({ refreshToken: authorization });

    if (!foundAdmin) {
      return res.status(404).json({ MSG: "Logged out unsuccessfully but no jwt authorization found" });
    } else {
      // Clear refreshToken in the database
      let ckeck = await adminModel.findOneAndUpdate(
        { refreshToken: authorization },
        { $set: { refreshToken: "logged out" } }
      );
      if (ckeck) {
        res.status(200).json({ MSG: `Logged out successfully ${foundAdmin.username}` });
      }
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { handleAdminLogout };
