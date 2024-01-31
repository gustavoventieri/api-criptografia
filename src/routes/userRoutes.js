const express = require("express");
const routes = express.Router();
const userModel = require("../models/userModel");
const crypted = require("../services/criptoFiles");

const getUserInformation = routes.get("/users/getAll", async (req, res) => {
  try {
    const users = await userModel.find();
    if (users == null) {
      res.status(500).json({
        resultado: "este dados foram excluidos ou nunca existiram",
      });
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500).json(`Erro: ${error}`);
  }
});

const getUserInformationByID = routes.get(
  "/users/getByID/:id",
  async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userModel.findById(id);

      if (user === null) {
        res.status(500).json({
          resultado: "este dados foram excluidos ou nunca existiram",
        });
      } else {
        const decryptUserinformation = {
          _id: user._id,
          userDocument: crypted.decryptText(user.userDocument),
          creditCardToken: crypted.decryptText(user.creditCardToken),
          value: user.value,
          __v: user.__v,
        };
        res.status(200).json(decryptUserinformation);
      }
    } catch (error) {
      res.status(500).json(`Erro: ${error}`);
    }
  }
);

const postUserInformation = routes.post("/users/postuser", async (req, res) => {
  try {
    const insertUser = {
      userDocument: crypted.encryptText(req.body.userDocument),
      creditCardToken: crypted.encryptText(req.body.creditCardToken),
      value: req.body.value,
    };

    const user = await userModel.create(insertUser);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Erro: ${error}`);
  }
});

const deleteUserInformation = routes.delete(
  "/users/deleteByID/:id",
  async (req, res) => {
    try {
      const id = req.params.id;
      const user = await userModel.findByIdAndDelete(id);
      if (user === null) {
        res.status(500).json({
          resultado: "este dados foram excluidos ou nunca existiram",
        });
      } else {
        res.status(200).json(user);
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
};
