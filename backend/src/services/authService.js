const User = require('../models/user');
const Role = require('../models/role')
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
  // get role id by roleName ;
  const roleId = await Role.findOne({ roleName: 'user' });
  console.log(roleId._id)
  // Tạo người dùng mới với mật khẩu đã mã hóa
  const newUser = new User({
    fullName,
    password: hashedPassword,  // Lưu mật khẩu đã mã hóa
    phone,
    email,
    role_id:roleId._id,
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
  const getRoleName = await Role.findOne({_id : user.role_id});
  console.log(getRoleName);

  const token = generateToken(user._id, user.fullName, user.email, user.phone, getRoleName.roleName);
  // Trả về user và token, bao gồm cả role_id
  return { user, token };
};

const getAllUser = async (page = 1, limit = 5) => {
  // Tính toán số lượng mục cần bỏ qua
  const skip = (page - 1) * limit;

  // Lấy danh sách users với phân trang và populate roleName từ Role
  const users = await User.find()
      .skip(skip) // Bỏ qua các mục trước trang hiện tại
      .limit(limit) // Giới hạn số lượng mục trả về mỗi trang
      .populate('role_id', 'roleName'); // Populate chỉ trường roleName từ Role

  // Lấy tổng số lượng các user để tính tổng số trang
  const totalUsers = await User.countDocuments();

  // Tính tổng số trang
  const totalPages = Math.ceil(totalUsers / limit);

  return {
      data: users,
      totalUsers,
      totalPages,
      currentPage: page
  };
};

module.exports = {
  register,
  login,
  getAllUser,
};
