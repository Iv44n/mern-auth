export const getVerifyEmailTemplate = (url: string) => ({
  subject: 'Verify Your Email Address',
  text: `Hello, 
  
Please verify your email address by clicking the link below:

${url}

If you didn't request this, please ignore this email.

Thank you!`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
      <h2 style="color: #333;">Verify Your Email Address</h2>
      <p style="color: #555;">Hello,</p>
      <p style="color: #555;">
        Please verify your email address by clicking the button below.
      </p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${url}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
      </div>
      <p style="color: #888;">
        If you didn't request this, please ignore this email.
      </p>
      <p style="color: #888;">Thank you!</p>
    </div>
  `
})
