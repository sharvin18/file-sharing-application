const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4: uuid4} = require('uuid');

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
        fileSize: 1000000*100  // File size in bytes 100mb  
    }
}).single('uploadedFile');


router.post('/', (req, res) => {

    // Store files
    upload(req, res, async (err) => {

        // Validating requests
        if(!req.file){
            return res.json({ error : "All fields are required."});
        }

        if(err){
            return res.status(500).send({ error: err.message });
        }


        // Store in database

        const file = new File(
            {
                fileName: req.file.filename,
                uuid: uuid4(),
                path: req.file.path,
                size: req.file.size
            }
        );

        console.log(file)
        const response = await file.save();
        
        // return file url
        console.log("Yaha tak toh aa gaya");
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});


    });


    

    // Send response link
});

module.exports = router;
