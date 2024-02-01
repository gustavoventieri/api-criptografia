const express = require("express");
const routes = express.Router();
const userModel = require("../models/userModel");
const crypted = require("../services/criptoFiles.js");

// Procura por todas as informações do usuario
const getUserInformation = routes.get("/users/getAll", async (req, res) => {
  try {
    const usersData = await userModel.find();
    if (usersData == null) {
      res.status(500).json({
        resultado: "este dados foram excluidos ou nunca existiram",
      });
    } else {
      res.status(200).json(usersData);
    }
  } catch (error) {
    res.status(500).json(`Erro: ${error}`);
  }
});

// Procura as informações do usuario por ID
const getUserInformationByID = routes.get(
  "/users/getByID/:id",
  async (req, res) => {
    try {
      const id = req.params.id;
      const usersData = await userModel.findById(id);

      if (user == null) {
        res.status(500).json({
          resultado: "este dados foram excluidos ou nunca existiram",
        });
      } else {
        const decryptUserinformation = {
          _id: usersData._id,
          userDocument: crypted.decryptText(usersData.userDocument),
          creditCardToken: crypted.decryptText(usersData.creditCardToken),
          value: usersData.value,
          __v: usersData.__v,
        };
        res.status(200).json(decryptUserinformation);
      }
    } catch (error) {
      res.status(500).json(`Erro: ${error}`);
      console.log(error);
    }
  }
);

// Adiciona informações do usuario ao db
const postUserInformation = routes.post("/users/postuser", async (req, res) => {
  try {
    const encryptUserInformation = {
      userDocument: crypted.encryptText(req.body.userDocument),
      creditCardToken: crypted.encryptText(req.body.creditCardToken),
      value: req.body.value,
    };

    const usersData = await userModel.create(encryptUserInformation);
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json(`Erro: ${error}`);
  }
});

// Exclui as informações do usuario do db
const deleteUserInformation = routes.delete(
  "/users/deleteByID/:id",
  async (req, res) => {
    try {
      const id = req.params.id;
      const usersData = await userModel.findByIdAndDelete(id);
      if (usersData == null) {
        res.status(500).json({
          resultado: "este dados foram excluidos ou nunca existiram",
        });
      } else {
        res.status(200).json({
          result: "exclusão realizada com sucesso",
        });
      }
    } catch (error) {
      res.status(500).json(`Erro: ${error}`);
    }
  }
);

// Atualiza as informações do usuario do db
const patchUserInformation = routes.patch(
  "/users/patchByID/:id",
  async (req, res) => {
    try {
      const id = req.params.id;
      const usersData = await userModel.findById(id);
      if (
        req.body.userDocument == undefined &&
        req.body.creditCardToken == undefined
      ) {
        await userModel.updateOne(
          { _id: id },
          {
            value: req.body.value,
          }
        );
      } else if (req.body.creditCardToken == undefined) {
        await userModel.updateMany(
          { _id: id },
          {
            userDocument: crypted.encryptText(req.body.userDocument),
            value: req.body.value,
          }
        );
      } else if (req.body.value == undefined) {
        await userModel.updateMany(
          { _id: id },
          {
            userDocument: crypted.encryptText(req.body.userDocument),
            creditCardToken: crypted.encryptText(req.body.creditCardToken),
          }
        );
      } else if (
        req.body.creditCardToken == undefined &&
        req.body.value == undefined
      ) {
        await userModel.updateOne(
          { _id: id },
          {
            userDocument: crypted.encryptText(req.body.userDocument),
          }
        );
      } else if (
        req.body.userDocument == undefined &&
        req.body.value == undefined
      ) {
        await userModel.updateOne(
          { _id: id },
          {
            creditCardToken: crypted.encryptText(req.body.creditCardToken),
          }
        );
      } else if (req.body.userDocument == undefined) {
        await userModel.updateMany(
          { _id: id },
          {
            creditCardToken: crypted.encryptText(req.body.creditCardToken),
            value: req.body.value,
          }
        );
      } else {
        await userModel.updateMany(
          { _id: id },
          {
            userDocument: crypted.encryptText(req.body.userDocument),
            creditCardToken: crypted.encryptText(req.body.creditCardToken),
            value: req.body.value,
          }
        );
      }

      if (usersData == null) {
        res.status(500).json({
          resultado: "este dados foram excluidos ou nunca existiram",
        });
      } else {
        res.status(200).json({
          resultado: "Dados atualizados com sucesso",
        });
      }
    } catch (error) {
      res.status(500).json(`Erro: ${error}`);
    }
  }
);

module.exports = {
  getUserInformation,
  getUserInformationByID,
  postUserInformation,
  deleteUserInformation,
  patchUserInformation,
};
