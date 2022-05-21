

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const routes = require("./routes");
const {connect} = require('./database/connect')

connect()

app.use(express.json());
app.use(cors());
app.use(routes);


app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// // enable files upload
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use(express.json());


const port = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.json({ info: "admin app APIs are up." });
});

app.listen(port, () => {
    console.log(`admin App running on port ${port}.`);
});