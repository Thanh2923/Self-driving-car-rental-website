const User = require('../models/user');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/jwtHelper');

// Đăng ký
const register = async (userData) => {
  const { fullName, password, phone, email } = userData;

  // Kiểm tra số điện thoại hoặc email đã tồn tại chưa
  const existingPhone = await User.findOne({ phone });
  if (existingPhone) throw new Error('Số điện thoại đã được sử dụng.');

  const existingEmail = await User.findOne({ email });
  if (existingEmail) throw new Error('Email đã được sử dụng.');

  // Mã hóa mật khẩu trước khi lưu vào cơ sở dữ liệu
  const hashedPassword = await bcrypt.hash(password, 10); // Sử dụng bcrypt để mã hóa mật khẩu với 10 vòng salt

  // Tạo người dùng mới với mật khẩu đã mã hóa
  const newUser = new User({
    fullName,
    password: hashedPassword,  // Lưu mật khẩu đã mã hóa
    phone,
    email,
    role_id:"675071f404f4233c617bc6ec"
  });

  // Lưu người dùng mới vào cơ sở dữ liệu
  return await newUser.save();
};

// Đăng nhập
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Email hoặc mật khẩu không đúng.');

  // So sánh mật khẩu đã mã hóa
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Email hoặc mật khẩu không đúng.');

  // Tạo token với các thông tin chi tiết của người dùng
  const token = generateToken(user._id, user.fullName, user.email, user.phone, user.role_id);

  // Trả về user và token, bao gồm cả role_id
  return { user, token };
};

const getAllUser = async () => {
  return await User.find();
};

module.exports = {
  register,
  login,
  getAllUser,
};