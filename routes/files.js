const router = require('express').Router();
const multer = require('multer');
const path = require('path');

let storage = multer.diskStorage({

    destination: (req, file, callback) => callback(null, 'uploads/'),
    filename: (req, file, callback) => {
        const name = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        callback(null, name);
    },
});

let upload = multer({
    storage: storage,
    limits:{
        fileSize: 1000000*100
    }
}).single('uploadFile');


router.post('/', (req, res) => {

    // Validating requests
        if(!req.file){
            return res.json({ error : "All fields are required."});
        }

    // Store files


    // Store in database

    // Send response link
});

module.exports = router;