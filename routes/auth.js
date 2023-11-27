const express = require("express");
const auth = require("../middelware/auth");
const router = express.Router();
const controller = require("../controllers/authcontroller");
router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/me", auth.check, controller.me);
module.exports = router;