const express = require('express');
const connectDb = require('./config/database');

const app = express();

const PORT = process.env.PORT || 3030;

connectDb();

// Routes
app.use('/api/files', require('./routes/files'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});