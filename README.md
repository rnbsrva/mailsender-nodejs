# Email Sender Application Documentation

## Overview
This Node.js application allows users to send emails using a simple web interface. It utilizes the Nodemailer library for email sending functionality and provides a user-friendly interface for inputting email details.

## Installation
1. Clone this repository to your local machine.
2. Install dependencies by running `npm install` in the project directory.

## Usage
1. Start the application by running `node app.js`.
2. Access the application through your web browser at `http://localhost:2912`.
3. Fill in the email details (recipient email address, subject, message) and click "Send Email" to send the email.

## Additional Features
- **Email Templates:** Email content can be customized using HTML templates.
- **Attachment Support:** Attach files to emails using Nodemailer's attachment feature.
- **Error Handling:** Implemented error handling for robustness.

## Dependencies
- Nodemailer
- Express.js
- Express Handlebars (optional, for using Handlebars templates)
