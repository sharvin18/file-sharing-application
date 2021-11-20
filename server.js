const express = require('express');
const connectDb = require('./config/database');
const path = require('path');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3030;

app.use(express.static('public'));

// Allows the server to parse JSON data.
app.use(express.json());

connectDb();

// Cors 
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(",")
}
app.use(cors(corsOptions));

// Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/showFile'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});