const express = require("express");
const authController = require("../controllers/authController"); 
const { requireAuth } = require("../middleware/authMiddleware");
const router = express.Router();

router.get('/register', authController.user_register_get);
router.post('/register', authController.registerUser);
router.get("/login", authController.user_login_get);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logout);

module.exports = router;