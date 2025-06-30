# Email Setup Guide

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure email settings:**
   - Copy `.env.example` to `.env`
   - Update the email credentials in `.env`:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ```

3. **For Gmail users:**
   - Enable 2-factor authentication in your Google account
   - Generate an app password: https://myaccount.google.com/apppasswords
   - Use the app password in the `EMAIL_PASS` field

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## Alternative Email Services

If you prefer not to use Gmail, you can modify the transporter configuration in `server.js`:

### For Outlook/Hotmail:
```javascript
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

### For custom SMTP:
```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
```

## Testing

1. Open http://localhost:3000 in your browser
2. Navigate to the contact form
3. Fill out the form and submit
4. Check that the email is received at jonas.lounissi@gmail.com
5. Verify the notification appears with a progress bar