const express = require('express');


const app = express();

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
    consolel.log(`Listening on port ${PORT}`)
});