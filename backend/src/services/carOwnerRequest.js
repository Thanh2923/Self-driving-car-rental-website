const CarOwnerRequest = require("../models/carOwnerRequest");

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

module.exports = {
  carOwnerRequests,
  getAllCarOwnerRequest
};
