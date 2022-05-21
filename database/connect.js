
const mongoose = require("mongoose");

const databaseConnectionString = `mongodb+srv://admin:admin@cluster0.jfdhw.mongodb.net/?retryWrites=true&w=majority`

const connect = () => {

    try {
        mongoose.connect(databaseConnectionString, () =>
            console.log("Database connected successfully")
        );
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    connect,
}