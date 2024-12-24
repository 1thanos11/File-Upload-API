const dbConnection = require("./DB/dbConnection");

const postRouter = require("./routers/Image");

const dotenv = require("dotenv");

require("dotenv").config({ path: "./config/config.env" });

dbConnection();

const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/post", postRouter);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server Listeninig On PORT ${port}`);
});
