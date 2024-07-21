const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    uploader: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Kullanıcıları referans olarak alıyoruz
    // documentName: { type: String, required: true },
    // documentType: {
    //   type: String,
    //   enum: ["document1", "document2", "document3"],
    //   required: true,
    // }, // Belge türü enum olarak belirlendi
    status: { type: String, enum: ["approved", "pending"], default: "pending" }, // Onay durumu enum olarak belirlendi
    fileData: [
      {
        originalName: { type: String, required: true },
        buffer: { type: Buffer, required: true },
      },
    ], // PDF dosyasını binary olarak saklar
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ModelDocument = model("Document", DocumentSchema);

module.exports = ModelDocument;
