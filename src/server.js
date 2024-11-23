const express = require('express');
const database = require('./src/routes/database-config');
const app = express();
const cookie = require('cookie-parser');
const PORT = process.env.PORT || 3000;

app.use("/js", express.static(__dirname + "/src/public/js"));
app.use("/styles", express.static(__dirname + "/src/public/styles"));
app.use("/images", express.static(__dirname + "/src/views/images"));
app.use("/views", express.static(__dirname + "/src/views"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(cookie());
app.use(express.json());
app.use("/", require("./src/routes/pages"));
app.use("/api", require("./src/controllers/auth"));


app.use((req, res) => {
  res.status(404).send('Page Not Found');
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
