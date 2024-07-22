// DocumentController.js
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const serviceDocument = require("../services/ServiceDocument");

const uploadDocument = async (req, res) => {
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
      console.log("Saved DOC:::", savedDocuments);
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

    return res.status(200).json(documents[0]);
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

const getAllDocuments = async (req, res) => {
  try {
    const documents = await serviceDocument.documentsGetAll();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDocument = async (req, res) => {
  try {
    const newFileData = req.body.fileData.map((file) => ({
      originalName: file.originalName,
      buffer: Buffer.from(file.buffer, "base64"),
    }));
    const newData = { ...req.body, fileData: newFileData };

    // Belgeyi ID ile bulup güncelle
    const updatedDocument = await serviceDocument.documentUpdateByID(
      req.body._id,
      newData
    );

    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.status(200).json({
      data: updatedDocument,
      message: "Document updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateDocumentStatusByID = async (req, res) => {
  try {
    const documents = await serviceDocument.documentUpdateStatusByID(
      req.body.id,
      req.body.status,
      req.body.rejectionMessage
    );
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
  getAllDocuments,
  updateDocument,
  updateDocumentStatusByID,
};
