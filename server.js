const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: false,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/budger", opts)
// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});