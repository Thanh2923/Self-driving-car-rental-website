const carOwnerRequests = require("../services/carOwnerRequest");
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
    return res.status(201).json({ message: "Request created successfully", data: carOwnerRequest });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
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
module.exports = {
  CartOwnerRequest,
  ViewCarOwnerRequest
};
