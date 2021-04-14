const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/todos/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/todo.routes")(app);
// set port, listen for requests


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
