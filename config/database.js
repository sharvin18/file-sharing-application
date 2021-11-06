const mongoose = require('mongoose');
require('dotenv').config();


function connectDb() {

    mongoose.connect(process.env.MONGO_CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true});

    const connection = mongoose.connection;

    connection.on('error', console.error.bind(console, 'connection error:'));

    connection.once('open', () => {
        console.log("Database connected");
    });

}

module.exports = connectDb;