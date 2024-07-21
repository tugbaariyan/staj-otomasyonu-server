const { Router } = require("express");
const router = Router();
const controllerDocument = require("../controller/ControllerDocument");

router.post("/uploadDocument", controllerDocument.uploadDocument);
router.get("/documents/:id", controllerDocument.getDocumentById);
router.get("/userDocuments/:userId", controllerDocument.getDocumentsByUserId);
router.get("/getAllWithUser", controllerDocument.getAllDocumentsWithUsers);

module.exports = router;
