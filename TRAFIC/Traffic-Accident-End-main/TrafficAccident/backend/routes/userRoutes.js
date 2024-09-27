const express = require("express");
const { authenticateUser } = require("../middleware/authenticateUser");
const {
  getUsers,
  getUserByUserNameController,
  register,
  login,
  getLoggedInUserInfo,
  sendBulkMessage,
} = require("../controllers/userController");

const router = express.Router();

// Async hata yakalama işlevi
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", asyncHandler(getUsers));

router.get("/:username", asyncHandler(getUserByUserNameController));

router.post("/register", asyncHandler(register));

router.post("/login", asyncHandler(login));
router.get("/profile", authenticateUser, asyncHandler(getLoggedInUserInfo));
router.post("/send-bulk-message", asyncHandler(sendBulkMessage));

module.exports = router;
