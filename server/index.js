const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/farmer", require("./routes/FarmerDetails"));
app.use("/customer", require("./routes/CustomerDetails"));
app.use("/admin", require("./routes/Admin"));
app.use("/", require("./routes/Home"));

app.get("/api", (req, res) => {
  res.send("Api is running");
});
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.send("Api is running");
  });
}

app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
