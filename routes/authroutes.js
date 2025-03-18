const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.get('/register', authController.user_register_get);
router.post('/', authController.registerUser);
router.get("/login", authController.user_login_get);
router.post("/", authController.loginUser);

module.exports = router;