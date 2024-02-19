const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./configs/connectDB.js");
const configCORS = require("./configs/CORS.js");

const apiRouters = require("./routes/api.js");

const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

//to config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application/x-www-form-urlencoded post data

//config CORS
configCORS(app);

//connection DB
connection();

//config router
app.use("/api", apiRouters);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
