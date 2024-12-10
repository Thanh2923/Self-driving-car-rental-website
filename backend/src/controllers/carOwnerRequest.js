const carOwnerRequests = require ("../services/carOwnerRequest");
// const wbm = require("wbm");
const Nodemailer = require("nodemailer");
const { MailtrapClient } = require("mailtrap");
const authService = require("../services/authService");
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
  //   const userId = req.user.userId;

  const { id } = req.params; // id  cartRequest
  const { status, message } = req.body;
  console.log(id, status, message);
  try {
    const getUserOwner = await carOwnerRequests.getCarOwnerRequestById(id);
    console.log(getUserOwner);
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

    const getEmail = await carOwnerRequests.getEmail(getUserOwner.user_id);

    console.log(getEmail);

    // update role
    if (status === "Approved") {
      const ownerCarRole = await authService.getRoleByName("ownerCar");
      if (!ownerCarRole) {
        return res.status(400).json({ message: "Role not found" });
      }

      const updateRole = await authService.updateUserRole(
        getUserOwner.user_id,
        ownerCarRole._id
      );
    }
    //
    const TOKEN = "12ca1b117ae28fb61627c0973da2586f";

    const client = new MailtrapClient({
      token: TOKEN
    });

    const sender = {
      email: "hello@demomailtrap.com",
      name: "Send email"
    };
    const recipients = [
      {
        email: "rencooking09202@gmail.com"
      }
    ];

    client
      .send({
        from: sender,
        to: recipients,
        template_uuid: "bd9dce39-54a7-4924-a59f-f103b4bcf3e0",
        template_variables: {
          company_info_name: "3H1D",
          email: getUserOwner.email,
          first_name: getUserOwner.nameOwnerCar,
          last_name: getUserOwner.status,
          company_info_address: "Test_Company_info_address",
          company_info_city: "Test_Company_info_city",
          company_info_zip_code: "Test_Company_info_zip_code",
          company_info_country: "Test_Company_info_country"
        }
      })
      .then(
        res.status(200).json({ message: message, data: saveUpdate }),
        console.error
      );

    // return res.status(200).json({ message: message, data: saveUpdate });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  CartOwnerRequest,
  ViewCarOwnerRequest,
  UpdateCarOwnerRequestStatus
};
