const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connection = require("./configs/connectDB.js");
const cors = require("cors");

const apiRouters = require("./routes/api.js");

const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

const cookieParser = require("cookie-parser");

//to config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //support parsing of application/x-www-form-urlencoded post data

//to config cookie-parser
app.use(cookieParser());

//config CORS
app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);

//connection DB
connection();

//config router
app.use("/api", apiRouters);

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
