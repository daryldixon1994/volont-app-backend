const express = require("express");

const app = express();
const connect = require("./lib/connect");

connect();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());

//user middleware
app.use("/api/user", require("./routes/user"));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is up and running 🚀");
});
