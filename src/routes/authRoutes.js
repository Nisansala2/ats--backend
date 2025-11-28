const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/login", (req, res) => {
    res.json({ message: "Auth route working" });
});



module.exports = router;
