const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "File_Upload",
    })
    .then(() => {
      console.log({ message: "DataBase Connected Successfully" });
    })
    .catch((error) => {
      console.log("DataBase Connection Failed", { error: error.message });
    });
};

module.exports = dbConnection;
