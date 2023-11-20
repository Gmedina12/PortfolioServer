import nodemailer from 'nodemailer'
import 'dotenv/config'


export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
})

transporter.verify()
    .then(() => console.log('nodemailer has been configured'))
    .catch((error) => console.log(error.message))