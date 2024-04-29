// DocumentController.js

const multer = require("multer");
const upload = multer().single("fileData"); // multer middleware'i, dosyayı belleğe alacak şekilde yapılandırılıyor ve "fileData" alanından gelen dosyayı alıyoruz

const serviceDocument = require("../services/ServiceDocument");

const uploadDocument = async (req, res) => {
  console.log(req);
  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const documentData = {
        uploader: req.body.uploader,
        documentName: req.body.documentName,
        fileData: req.file.buffer, // multer tarafından işlenen dosyanın buffer'ı
      };

      const savedDocument = await serviceDocument.uploadDocument(documentData);

      return res.status(201).json({
        message: "Document uploaded successfully",
        document: savedDocument,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadDocument,
};
