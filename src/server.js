//require("dotenv").config();
const express = require("express");
const cors = require("cors");
//const morgan = require("morgan");
const connect = require("./db");
// const studentRouter = require("./routes/student.js");
// const adminRouter = require("./routes/admin");
// const challengeRouter = require("./routes/challenge");
//const {verify} = require("./utils/mailer")

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

// app.use("/student", roomieRouter);
// app.use("/admin", hostRouter);
// app.use("/retos", spaAdver);
app.listen(port, () => {
  console.log(`App runnig at http://localhost:${port}`);
});
