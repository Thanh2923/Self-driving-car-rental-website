const authService = require('../services/authService');

// Đăng ký
const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'Đăng ký thành công', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đăng nhập
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);
    res.status(200).json({ message: 'Đăng nhập thành công', user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUser = async (req, res) => {
    try {
        const users = await authService.getAllUser();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = {
  register,
  login,
  getAllUser,
};
