import { transporter } from '../../Config/nodemailer.js';
import 'dotenv'
import {sendConfirmationEmail} from './sendConfirmationEmail.js'

export const recieveContactEmail = async (_, {name, sender, subject, message}) => {
  const EMAIL = process.env.EMAIL  
  const mailOptions = {
        from: sender,
        to: EMAIL,
        subject: subject,
        text: `Message from ${name}\n🔹 E-mail: ${sender} \n\n🔹 Message: \n${message}`
    }
    try {
        await transporter.sendMail(mailOptions);
        sendConfirmationEmail(sender, name);
        return `Thanks for contact me ${name}!⭐`
        
      } catch (error) {
        console.error('An unexpected error occurred while receiving the email:', error);
        throw new Error('500 - Internal server error: ', error);
      }
    };
    
