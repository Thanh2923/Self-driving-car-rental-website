const CarOwnerRequest = require("../models/carOwnerRequest");
const User = require("../models/user");
const validatePhoneNumber = (phone) => {
  // Regex for Vietnamese phone numbers (starts with 0, 9-11 digits)
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;

  return phoneRegex.test(phone);
};
const carOwnerRequests = async (requestData) => {
  // send request
  const carOwnerRequest = new CarOwnerRequest(requestData);
  return await carOwnerRequest.save();
};

const getAllCarOwnerRequest = async () => {
  try {
    return await CarOwnerRequest.find();
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
};

const getCarOwnerRequestById = async (id) => {
  try {
    return await CarOwnerRequest.findById(id);
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};

const updateCarOwnerRequest = async (getUserOwner) => {
  try {
    const updateStatus = new CarOwnerRequest(getUserOwner);
    return await updateStatus.save();
  } catch (err) {
    console.log(err);
    throw Error(err);
  }
};

const getEmail = async (userId) => {
  try {
    return await User.findOne({_id : userId });
  } catch (err) {
    console.log(err);
    throw Error(err.message);
  }
};
const checkOwner = async (userId) => {
try {
return await CarOwnerRequest.findOne({user_id : userId})
}catch(err){
    console.log(err);
    throw Error(err.message);
}
}

module.exports = {
  carOwnerRequests,
  getAllCarOwnerRequest,
  getCarOwnerRequestById,
  updateCarOwnerRequest,
  getEmail,checkOwner
};
