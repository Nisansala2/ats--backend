const express = require("express");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");
const { uploadMiddleware } = require("../services/storageService");
const cvController = require("../controllers/cvController");

// POST /upload
router.post(
  "/upload",
  authMiddleware,                // 1️⃣ check auth first
  uploadMiddleware.single('cv'), // 2️⃣ multer handles the file
  cvController.upoloadcv       // 3️⃣ controller
);
//





module.exports = router;

