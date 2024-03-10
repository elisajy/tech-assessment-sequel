const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + '/app/views/';

const app = express();
app.use(express.static(path));

var corsOptions = {
    origin: [
        "http://localhost:8081",
        "http://localhost:8080",
        "http://localhost:4200"
    ]
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync();

require("./app/routes/tech.routes")(app);

app.get('/', function (req, res) {
    res.sendFile(path + "index.html");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});