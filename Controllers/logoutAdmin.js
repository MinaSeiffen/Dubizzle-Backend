const adminModel = require("../Models/adminschema");

const handleAdminLogout = async (req, res) => {
  const Authorization = req.headers.token;
  if (!Authorization) {
    console.log("No jwt cookie found");
    return res.sendStatus(204); // No content
  }

  try {
    const foundAdmin = await adminModel.findOne({ refreshToken: Authorization });
    console.log(foundAdmin);

    if (!foundAdmin) {
      return res.sendStatus(204).json({ MSG: "Logged out successfully but no jwt Authorization found" });
    }
    // Clear refreshToken in the database
    await adminModel.findOneAndUpdate(
      { refreshToken: Authorization },
      { $set: { refreshToken: "logged out" } }
    );
    res.status(204).json({ MSG: `Logged out successfully ${foundAdmin.username}` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { handleAdminLogout };
