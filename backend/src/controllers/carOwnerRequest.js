const carOwnerRequests = require("../services/carOwnerRequest");

// when user want to request a car owner
const CartOwnerRequest = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user.userId;
    console.log(userId);
    const requestData = { ...data, user_id: userId };
    console.log(requestData);
    const carOwnerRequest = await carOwnerRequests.carOwnerRequests(
      requestData
    );
    if (!carOwnerRequest) {
      return res.status(400).json({ message: "Request not found" });
    }
    console.log(carOwnerRequest);
    // return res.json(201).json({ message: carOwnerRequest });
    return res
      .status(201)
      .json({ message: "Request created successfully", data: carOwnerRequest });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// only can admin views list request

const ViewCarOwnerRequest = async (req, res) => {
  try {
    const getAll = await carOwnerRequests.getAllCarOwnerRequest();
    if (!getAll || getAll.length === 0) {
      return res.status(400).json({ message: "No requests found" });
    }
    return res.status(200).json({ data: getAll, success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const UpdateCarOwnerRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status, message } = req.body;
  try {
    const getUserOwner = await carOwnerRequests.getCarOwnerRequestById(id);
    if (!getUserOwner) {
      return res.status(400).json({ message: "Request not found" });
    }
    getUserOwner.status = status;
    const saveUpdate = await carOwnerRequests.updateCarOwnerRequest(
      getUserOwner
    );
    if (!saveUpdate) {
      return res.status(400).json({ message: "Failed to update request" });
    }

    return res.status(200).json({ message: message, data: saveUpdate });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  CartOwnerRequest,
  ViewCarOwnerRequest,
  UpdateCarOwnerRequestStatus
};
