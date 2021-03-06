const path = require("path");
const express = require("express");
const app = express();
const publicPath = path.join(__dirname, "..", "public");
// handling Heroku dynamic ports
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// this takes care of paths CANNOT GET error when typing in bar
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {
  console.log("Express server is running!");
});
