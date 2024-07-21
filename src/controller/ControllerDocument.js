// DocumentController.js
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const serviceDocument = require("../services/ServiceDocument");

const uploadDocument = async (req, res) => {
  console.log("req.body:", req.body); // Form verilerini konsola yazdırma
  console.log("req.files:", req.files);
  try {
    upload.array("fileData")(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const documentsData = {
        uploader: req.body.uploader,
        fileData: req.files.map((file) => ({
          originalName: file.originalname,
          buffer: file.buffer, // multer tarafından işlenen dosyanın buffer'ı
        })),
      };

      const savedDocuments = await serviceDocument.documentsSave(documentsData);

      return res.status(201).json({
        message: "Document uploaded successfully",
        document: savedDocuments,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocumentById = async (req, res) => {
  const documentId = req.params.userId;
  try {
    const document = await serviceDocument.documentFindByID(documentId);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    return res.status(200).json(document);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getDocumentsByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const documents = await serviceDocument.documentFindByUserID(userId);

    return res.status(200).json(documents);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllDocumentsWithUsers = async (req, res) => {
  try {
    const documents = await serviceDocument.documentsGetAllWithUsers();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadDocument,
  getDocumentById,
  getDocumentsByUserId,
  getAllDocumentsWithUsers,
};
