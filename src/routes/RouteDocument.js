const { Router } = require("express");
const router = Router();
const controllerDocument = require("../controller/ControllerDocument");

router.post("/uploadDocument", controllerDocument.uploadDocument);

module.exports = router;
