const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./lib/connect");

connect();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
//user middleware
app.use("/api/user", require("./routes/user"));
app.use("/api/association", require("./routes/association"));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is up and running 🚀");
});
