import sgMail from "@sendgrid/mail";
import { envVariables } from "../configs";
import nodemailer from "nodemailer";

//using sendgrid
sgMail.setApiKey(envVariables.SENDGRID_API_KEY);
export const sendMail = async (email, subject, text) => {
    const msg = {
        to: email,
        from: "poppy99.dev@gmail.com",
        subject,
        text,
    };
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);

        if (error.response) {
            console.error(error.response.body);
        }
    }
};

// using nodemailer
export const sendEmail = async (email, subject, text) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: gmail,
            pass: pass,
        },
    });
    await transporter.sendMail({
        from: gmail,
        to: email,
        subject,
        text,
    });
};
