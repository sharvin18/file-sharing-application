const express = require('express');
const connectDb = require('./config/database');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3030;

connectDb();

// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/showFile'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});