const mongoose = require('mongoose');

function connectDb() {

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: true });

    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log("Database connected");
    });
}