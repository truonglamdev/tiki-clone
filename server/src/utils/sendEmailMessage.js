import nodeMailer from 'nodemailer';
import createMessage from './createMessage.js';

const sendEmailMessage = async (config) => {
    try {
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
                user: process.env.SM_EMAIL_USER,
                pass: process.env.SM_EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SM_EMAIL_USER,
            to: config.email,
            subject: config.subject,
            text: config.message,
        };
        await transporter.sendMail(mailOptions);
        return createMessage(200, `Email sent to ${config.email} successfully`);
    } catch (error) {
        return createMessage(500, `Server error ${error.message}`);
    }
};

export default sendEmailMessage;
