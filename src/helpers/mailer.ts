import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

export const sendMail = async({ email, emailType, userId }: any) => {
    try {
        // create a hash token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        if(emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, 
                verifyTokenExpiry: Date.now() + 3600000 
            });
        } else if(emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, 
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "170d7ec76888aa",
              pass: "9e674c18a990cf"
              // Todo: add these credentials to .env file
            }
        });

        const mailOptions = {
            from: 'tushar.toshi12@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your Password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to 
            ${emailType === "VERIFY" ? 'Verify your email' : 'Reset your password'}
            </p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;
    } catch(err: any) {
        throw new Error(err.message);
    }
}