const authService = require('../services/authService');

// Đăng ký
const register = async (req, res) => {
  try {
    const users = await authService.register(req.body);
    res.status(201).json({ message: 'Đăng ký thành công', users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Đăng ký
const addUser = async (req, res) => {
  try {
    const users = await authService.addUser(req.body);
    res.status(201).json({ message: 'Đăng ký thành công', users });
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
  const { page = 1, limit = 5 } = req.query;
    try {
        const users = await authService.getAllUser(Number(page), Number(limit));
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await authService.getUserById(id);
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
   
    const updatedUser = await authService.updateUser(id, req.body.formData);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await authService.deleteUser(id);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  } 
};


module.exports = {
  register,
  login,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
  addUser
};
