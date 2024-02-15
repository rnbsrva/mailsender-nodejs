require('dotenv').config();

// Required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');



// Initialize Express app
const app = express();

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// GET route for serving the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// POST route for handling form submission
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;


    if (!to || !subject || !text) {
        return res.status(400).json({ error: 'Invalid argument exception' });
    }

    console.log(req.body)
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.SMTP_EMAIL, 
            pass: process.env.SMTP_PASSWORD 
        }
    });

      // Read the email template file
  const emailTemplate = fs.readFileSync(__dirname + '/email-template.html', 'utf8');

  // Inject dynamic content into the template
  const html = emailTemplate.replace(/{{subject}}/g, subject).replace(/{{text}}/g, text);

    // Email message options
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: to,
        subject: subject,
        html: html
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('Error occurred, email not sent.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
