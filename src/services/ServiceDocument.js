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

const documentsGetAll = async () => {
  try {
    const documents = await Document.find({});
    return documents;
  } catch (error) {
    throw new Error("Failed to fetch all documents: " + error.message);
  }
};

const documentUpdateByID = async (documentId, updateData) => {
  try {
    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      updateData,
      { new: true }
    );
    return updatedDocument;
  } catch (error) {
    throw new Error("Failed to update document: " + error.message);
  }
};

const documentUpdateStatusByID = async (
  documentId,
  newStatus,
  rejectionMessage
) => {
  try {
    // Status değerini güncelle
    const updatedDocument = await Document.findByIdAndUpdate(
      documentId,
      { $set: { status: newStatus, rejectionMessage: rejectionMessage } }, // $set operatörü sadece status alanını günceller
      { new: true } // Güncellenmiş belgeyi döndür
    );

    if (!updatedDocument) {
      throw new Error("Document not found");
    }

    return updatedDocument;
  } catch (error) {
    throw new Error("Failed to update document status: " + error.message);
  }
};

const documentsGetAllWithStatus = async (status) => {
  try {
    const approvedDocuments = await Document.find({
      status: status,
    })
      .populate("uploader", "firstName lastName email")
      .select("-fileData -rejectionMessage -status");
    return approvedDocuments;
  } catch (error) {
    throw new Error("Failed to get approved documents: " + error.message);
  }
};

module.exports = {
  documentsSave,
  documentFindByID,
  documentFindByUserID,
  documentsGetAllWithUsers,
  documentsGetAll,
  documentUpdateByID,
  documentUpdateStatusByID,
  documentsGetAllWithStatus,
};
