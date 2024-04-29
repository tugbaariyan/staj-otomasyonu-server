const serviceUser = require("../services/ServiceUser");
const { passwordToHash, generateAccessToken } = require("../scripts/helper");

const createUser = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  serviceUser
    .createUser(req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const login = (req, res) => {
  req.body.password = passwordToHash(req.body.password);
  serviceUser
    .login(req.body)
    .then((result) => {
      if (!result) {
        return res.status(400).send({ message: "User not found!" });
      }

      const user = {
        ...result.toObject(),
        tokens: { accessToken: generateAccessToken(result.id) },
      };
      delete user.password;
      res.status(200).send(user);
    })
    .catch((err) => {});
};

const getAllStudents = (req, res) => {
  serviceUser
    .getAllStudents(req.body.id)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getById = (req, res) => {
  serviceUser
    .getById(req.params.userId)
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  login,
  createUser,
  getAllStudents,
  getById,
};
