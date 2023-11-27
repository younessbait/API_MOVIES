const express = require("express");
const auth = require("../middelware/auth");
const admin = require("../middelware/admin");
const router = express.Router();
const controller = require("../controllers/moviecontroller");

router.post("/", [auth.check, admin.check], controller.create);
router.put("/:id", [auth.check, admin.check], controller.update);
router.delete("/:id", [auth.check, admin.check], controller.delete);

router.get("/:id", auth.check, controller.find);
router.get("/", auth.check, controller.list);

router.post("/:id/reviews", auth.check, controller.addreviews);
router.get("/:id/reviews", controller.reviews);

module.exports = router;
