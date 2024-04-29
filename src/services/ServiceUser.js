const User = require("../models/ModelUser");

const createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const login = (userData) => {
  return User.findOne(userData);
};

const getAllStudents = () => {
  return User.find({ role: "student" });
};

const getById = (userId) => {
  return User.findById(userId);
};

module.exports = {
  createUser,
  login,
  getAllStudents,
  getById,
};
