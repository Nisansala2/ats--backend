const express = require("express");
const router = express.Router();
const testsuperbase = require("../controllers/testsuperbase.js");


router.get("/test-supabase", testsuperbase.testConnection);


module.exports = router;