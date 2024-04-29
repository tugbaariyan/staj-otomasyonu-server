const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    uploader: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Kullanıcıları referans olarak alıyoruz
    documentName: { type: String, required: true },
    status: { type: String, enum: ["approved", "pending"], default: "pending" }, // Onay durumu enum olarak belirlendi
    fileData: { type: Buffer, required: true }, // PDF dosyasını binary olarak saklar
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ModelDocument = model("Document", DocumentSchema);

module.exports = ModelDocument;
