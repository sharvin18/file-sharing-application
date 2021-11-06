const express = require('express');
const connectDb = require('./config/database');

const app = express();

const PORT = process.env.PORT || 3030;

connectDb();

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});