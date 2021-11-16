const mailer = require('nodemailer');

async function sendEmail({ sender, reciever, subject, text, html}){

    const transporter = mailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    let mail = await transporter.sendMail({
        from: `Your File is Ready! <${sender}>`,
        // from: sender,
        to: reciever,
        subject: subject,
        text: text,
        html: html
    });

    console.log(mail);
}


module.exports = sendEmail;