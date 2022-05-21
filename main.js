

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const databaseConnectionString = `mongodb+srv://admin:admin@cluster0.jfdhw.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(databaseConnectionString, () =>
  console.log("Database connected successfully")
);

app.use(cors());
const port = process.env.PORT || 3000;

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


app.get("/", (request, response) => {
    response.json({ info: "admin app APIs are up." });
});

app.listen(port, () => {
    console.log(`admin App running on port ${port}.`);
});