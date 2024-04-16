const adminModel = require('../Models/adminschema')
const bcrypt = require('bcrypt')

const handleAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
  try {
    const duplicate = await adminModel.findOne({ username: username });

    if (duplicate) return res.sendStatus(409); // Conflict

    const hashedPwd = await bcrypt.hash(password, 10);
    const newAdmin = new adminModel({
      username: username,
      email: req.body.email,
      password: hashedPwd,
      avatar: req.body.img,
      roles: { "User": 2001, "Admin": 5150 }
    });

    await newAdmin.save();
    console.log(newAdmin);
    res.status(201).json({ 'success': `New Admin ${username} created!` });

  } catch (error) {
    res.status(500).json({ 'message': error.message, fromme: "new erroro" });
  }
};

module.exports = { handleAdmin };
