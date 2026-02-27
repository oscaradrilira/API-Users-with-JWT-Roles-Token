const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'HeimdallTeam01@gmail.com',
        pass: 'fmfm pofm wgoh tvdk'
    }
});

const sendAlert = (emailTo, ipClient) => {
    if (!emailTo) return;

    const mailOptions = {
        form: 'HeimdallTeam01@gmail.com',
        to: emailTo,
        subject: "Security Alert: Multiple failed login attempts",
        text: `Hello.\n\nWe have detected too many failed login attempts on your account from the IP address: ${ipClient}.\n\nFor your security, we have temporarily blocked access from that location for 1 minute.\n\nIf this was you, please wait a moment. If this was not you, we recommend changing your password immediately.`,
    }

    transporter.sendMail(mailOptions).then(() => console.log(`Security Alert Send to ${emailTo}`)).catch(err => console.error(`Error sendig email ${err}`));
};

module.exports = { sendAlert };