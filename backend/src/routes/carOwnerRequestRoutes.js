const express = require("express");
const Middleware = require("../controllers/middleware");
const router = express.Router();
const carOwnerRequest = require("../controllers/carOwnerRequest");
router.post(
  "/submit",
  Middleware.verifyToken,
  carOwnerRequest.CartOwnerRequest
);
router.get(
  "/viewCarOwnerRequest",
  Middleware.verifyToken,
  carOwnerRequest.ViewCarOwnerRequest
);
module.exports = router;
