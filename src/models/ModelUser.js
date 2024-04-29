const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "teacher"], required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ModelUser = model("User", UserSchema);

module.exports = ModelUser;
