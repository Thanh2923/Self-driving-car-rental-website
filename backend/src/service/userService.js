const File = require('../models/user'); // Import file model



// Lấy tất cả các file
const getAllUser = async () => {
  try {
    const files = await File.find();
    return files;
  } catch (error) {
    throw new Error('Error fetching files');
  }
};


module.exports = {
 
  getAllUser,
};
