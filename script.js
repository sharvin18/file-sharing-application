const File = require("./models/file");
const fs = require('fs');
const connectDb = require('./config/database');

connectDb();

async function deleteData() {

    const pastDate = new Date(Date.now() - (24*60*60*1000));

    // Fetch all the files from db
    const files = await File.find({ createdAt: {$lt: pastDate} });
    
    // Delete those files which hour 24 or more hours old

    if(files.length){
        for(const file of files){

            try{
                fs.unlinkSync(file.path);

                await file.remove();

                console.log(`Successfully deleted ${file.fileName}`);
            }catch(err){

                console.log(`Error while deleting file ${err}`);

            }
        }
        console.log("Deletion complete");
    }
}

deleteData().then(process.exit);