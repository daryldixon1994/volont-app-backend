const express = require("express");
const cors = require("cors");
const app = express();
const connect = require("./lib/connect");
const path = require("path")
connect();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.set(path.resolve("uploads"), "uploads")
//user middleware
app.use("/api/user", require("./routes/user"));
app.use("/api/association", require("./routes/association"));
app.use("/api/admin", require("./routes/admin"));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is up and running 🚀");
});
