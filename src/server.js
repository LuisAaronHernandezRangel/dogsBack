//require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const morgan = require("morgan");
const connect = require("./db");
const duenoRouter = require("./routes/dueno.js");
const heroeRouter = require("./routes/heroe");
const perroAdvRouter = require("./routes/perroAdv");
// const {verify} = require("./utils/mailer")

const port = process.env.PORT || 8000;
const app = express();
connect();
//verify()

app.use(express.json());
app.use(cors());
//{origin: process.env.FRONTEND_URL || 'http://localhost:3000'}
   
//app.use(morgan("dev"));

app.get('/', (req, res) => {
  res.json( message , "muy conectado")
  console.log(req)
})

app.use("/heroe", heroeRouter);
app.use("/dueno", duenoRouter);
app.use("/advertisements", perroAdvRouter);
app.listen(port, () => {
  console.log(`App runnig at http://localhost:${port}`);
});
