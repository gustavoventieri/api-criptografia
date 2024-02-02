const express = require("express");
const routes = express.Router();
const UserControllers = require("../controllers/user_controllers.js");
const userControllers = new UserControllers();

// Procura por todas as informações do usuario
const getUserInformation = routes.get(
  "/users/getAll",
  userControllers.getAllUsersInformations
);

// Procura as informações do usuario por ID
const getUserInformationByID = routes.get(
  "/users/getByID/:id",
  userControllers.getUserInformationByID
);

// Adiciona informações do usuario ao db
const postUserInformation = routes.post(
  "/users/postuser",
  userControllers.postUserInformation
);

// Exclui as informações do usuario do db
const deleteUserInformation = routes.delete(
  "/users/deleteByID/:id",
  userControllers.deleteUserInformationByID
);

// Atualiza as informações do usuario do db
const patchUserInformation = routes.patch(
  "/users/patchByID/:id",
  userControllers.patchUserInformation
);

module.exports = {
  getUserInformation,
  getUserInformationByID,
  postUserInformation,
  deleteUserInformation,
  patchUserInformation,
};
