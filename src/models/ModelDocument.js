const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    uploader: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Kullanıcıları referans olarak alıyoruz
    status: {
      type: String,
      enum: ["approved", "pending", "denied"],
      default: "pending",
    }, // Onay durumu enum olarak belirlendi
    rejectionMessage: {
      type: String,
      default: "",
    },
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
