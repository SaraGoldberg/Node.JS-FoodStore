const mongoose = require('mongoose');

class DataBase {
    constructor() { }

    connect = () => {

        const url = "mongodb://localhost:27017/322669888";

        // const url = "mongodb://srv1:27017/322669888";

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => {
                console.log("mongoose is connected");
            })
            .catch((err) => {
                console.log(":(" + err);
            })
    }
}
module.exports = new DataBase();