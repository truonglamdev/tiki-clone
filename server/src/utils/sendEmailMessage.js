import nodeMailer from 'nodemailer';

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
        return {
            status: 'OK',
            message: `Email sent to ${config.email} successfully`,
        };
    } catch (error) {
        console.log('Error sending email', error);
        return error;
    }
};

export default sendEmailMessage;
