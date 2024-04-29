const Document = require("../models/ModelDocument");

const uploadDocument = async (documentData) => {
  try {
    const document = new Document(documentData);
    const savedDocument = await document.save();
    return savedDocument;
  } catch (error) {
    throw new Error("Document upload failed: " + error.message);
  }
};

module.exports = {
  uploadDocument,
};
