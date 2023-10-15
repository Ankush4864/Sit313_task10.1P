const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const cors = require('cors');


const app = express();
// Mailgun configuration
const domain = //'sandbox23aa43b1f6134a2e8cd8f311c7f5c01b.mailgun.org'; 
const api_key = //'003283b87b485ccf024dc346b7bdfdbe-5465e583-682bee89'; 
const mailgunInstance = mailgun({ apiKey: api_key, domain: domain });

const corseOptions = {
    origin: 'http://localhost:3000',
}
app.use(cors(corseOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// API endpoint for subscription
app.post('/', (req, res) => {
    const email = req.body;
    const mailData = {
        from: 'ankush <ankushsingla938@gmail.com>',
        to:'ankushsingla938@gmail.com',
        subject: 'Welcome to Our Newsletter!',
        text: 'Dear subscriber,\n\nThank you for signing up for our newsletter. We are excited to have you on board!\n\nBest regards,\nThe Newsletter Team',
    };

    mailgunInstance.messages().send(mailData, function (error, body) {
        if (error) {
            console.error(error);
            return res.status(500).send("Error sending email");
        } else {
            console.log(body);
            res.status(200).send("Email sent successfully");
        }
    });
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log('The Server is running at port ${PORT}!');
});