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


// Store file and generate download page link
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
        
        // return download page url
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});
    });

});


// Send email endpoint

router.post("/email", async (req,res) => {

    const {uuid, senderEmail, recieverEmail} = req.body;

    if(!uuid || !senderEmail || !recieverEmail){
        return res.status(422).send({ error: "All fields are required" });
    }

    const file = new File().findOne({ uuid: uuid });

    if(file.sender){
        return res.status(422).send({ error: "Email has already been sent" });
    }

    file.sender = senderEmail;
    file.reciever = recieverEmail;

    const response = await file.save();
    
    // Send Email
    const sendEmail = require("../services/emailService");
    sendEmail(
        { 
            sender: senderEmail,
            reciever: recieverEmail,
            subject: "File Sharing Application",
            text: `${senderEmail} shared a file with you`,
            html: require("../services/emailTemplate")({
                emailFrom: senderEmail,
                downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
                size: parseInt(file.size/1000)+ ' KB',
                expires:  '24 hours' 
            })
        }
    );
});

module.exports = router;
