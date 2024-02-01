require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connectToDB = require("./config/database/connect");
const route = require("./routes/userRoutes");

connectToDB();
app.use(express.json());

app.use(route.getUserInformation);
app.use(route.getUserInformationByID);

app.use(route.postUserInformation);
app.use(route.deleteUserInformation);
app.use(route.patchUserInformation);
app.listen(port, console.log(`Servidor rodando na porta ${port}`));
