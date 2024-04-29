const { Router } = require("express");
const router = Router();
const controllerUser = require("../controller/ControllerUser");

router.post("/login", controllerUser.login);
router.post("/create", controllerUser.createUser);
router.get("/getAll", controllerUser.getAllStudents);
router.get("/:userId", controllerUser.getById);

module.exports = router;
