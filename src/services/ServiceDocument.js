// Document Service

const Document = require("../models/ModelDocument");

const documentsSave = async (documentsData) => {
  try {
    console.log("DATA:::", documentsData);
    const savedDocuments = await Document.insertMany(documentsData);
    return savedDocuments;
  } catch (error) {
    throw new Error("Documents upload failed: " + error.message);
  }
};

const documentFindByID = async (documentId) => {
  try {
    const document = await Document.findById(documentId);
    return document;
  } catch (error) {
    throw new Error("Failed to retrieve document: " + error.message);
  }
};

const documentFindByUserID = async (userId) => {
  try {
    const documents = await Document.find({ uploader: userId });
    return documents;
  } catch (error) {
    throw new Error("Failed to retrieve document: " + error.message);
  }
};

const documentsGetAllWithUsers = async () => {
  try {
    const documents = await Document.find({}).populate(
      "uploader",
      "username email"
    ); // uploader alanını User modeli ile populate ediyoruz
    return documents;
  } catch (error) {
    throw new Error("Failed to fetch documents with users: " + error.message);
  }
};

module.exports = {
  documentsSave,
  documentFindByID,
  documentFindByUserID,
  documentsGetAllWithUsers,
};
