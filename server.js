const express = require("express");
const controllerRouting = require("./routes/index");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

controllerRouting(app);

app.listen(5000, "0.0.0.0", () => {
  
});

console.log(app.link);
module.exports = app;
