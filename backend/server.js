const express = require("express");
const mongoose = require("mongoose");
var app = express();
const port = 4000;
const cors = require("cors");
const routes = require("./routes/api");

require("dotenv").config();

const MONGODB_URL = process.env.MONGO_URI;
console.log("MONGO_URI:", MONGODB_URL); // Should print your URI


app.use(cors());

app.use("/api", routes);

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Db Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
