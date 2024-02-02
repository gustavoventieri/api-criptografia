const userModel = require("../models/userModel");
const crypted = require("../services/criptoFiles.js");

class userControllers {
  async getAllUsersInformations(req, res) {
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
  }

  async getUserInformationByID(req, res) {
    try {
      const id = req.params.id;
      const usersData = await userModel.findById(id);

      if (usersData == null) {
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

  async postUserInformation(req, res) {
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
  }

  async deleteUserInformationByID(req, res) {
    try {
      const id = req.params.id;
      const usersData = await userModel.findByIdAndDelete(id);
      if (usersData == null) {
        res.status(500).json({
          resultado: "este dados foram excluidos ou nunca existiram",
        });
      } else {
        res.status(200).json({
          resultado: "exclusão realizada com sucesso",
        });
      }
    } catch (error) {
      res.status(500).json(`Erro: ${error}`);
    }
  }

  async patchUserInformation(req, res) {
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
}
module.exports = userControllers;
