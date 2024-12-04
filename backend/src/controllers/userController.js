const User = require('../service/userService');

// Đảm bảo hàm getAllUsers được export chính xác
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUser();
   
    res.json({users:users});
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Đảm bảo export hàm hoặc object chứa các controller
module.exports = { getAllUsers };
