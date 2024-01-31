const mongoose = require("mongoose");
const keys = require("../keys");

const connectToDB = async () => {
  try {
    await mongoose.connect(keys.database.url());
    console.log("Conexão feita com sucesso!");
  } catch (error) {
    console.log(`Conexão com falha. Erro: ${error}`);
  }
};

module.exports = connectToDB;
