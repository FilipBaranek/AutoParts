const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const PORT = process.env.PORT || 3000;

app.use("/public", express.static(__dirname + "/src/public"));
app.use("/views", express.static(__dirname + "/src/views"));
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(cookie());
app.use(express.json());
app.use("/", require("./src/routes/pageRoutes"));
app.use("/api", require("./src/routes/apiRoutes"));

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
