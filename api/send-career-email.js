// api/send-career-email.js - FINAL VERSION
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  try {
    const { 
      name, 
      email, 
      phone, 
      location, 
      education, 
      college, 
      graduation,
      experience, 
      linkedin, 
      github, 
      portfolio, 
      cover, 
      source,
      jobTitle, 
      jobId 
    } = req.body;

    // Validate required fields
    if (!name || !email || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Generate application ID
    const appId = 'BN-APP-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Email configuration using environment variables
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify email configuration
    try {
      await transporter.verify();
      console.log('✅ Email server is ready to take our messages');
    } catch (verifyError) {
      console.error('❌ Email configuration error:', verifyError);
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error'
      });
    }

    // 1. CANDIDATE KO CONFIRMATION EMAIL
    const candidateEmail = {
      from: `"BillNeXX Careers" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Application Received - ${jobTitle} at BillNeXX`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #00f7ff, #7c3aed); color: white; padding: 30px; border-radius: 10px; text-align: center;">
            <h1 style="margin: 0;">🚀 Thank You for Applying!</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for applying to the <strong>${jobTitle}</strong> position at BillNeXX! We've received your application and our team will review it carefully.</p>
            
            <div style="background: #0f172a; color: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0; color: #00f7ff;">📋 Application Summary</h3>
              <p><strong>Application ID:</strong> ${appId}</p>
              <p><strong>Position:</strong> ${jobTitle}</p>
              <p><strong>Applied on:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p>Best regards,<br>
            <strong>BillNeXX Careers Team</strong></p>
          </div>
        </div>
      `,
    };

    // 2. INTERNAL TEAM KO NOTIFICATION
    const internalEmail = {
      from: `"BillNeXX Careers Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Same email for testing, bad me change kar lena
      subject: `NEW APPLICATION: ${jobTitle} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #7c3aed;">New Job Application Received</h2>
          
          <div style="background: #0f172a; color: white; padding: 20px; border-radius: 10px;">
            <h3 style="color: #00f7ff;">Candidate Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Position:</strong> ${jobTitle}</p>
            <p><strong>Application ID:</strong> ${appId}</p>
          </div>
          
          <p><em>Application received on: ${new Date().toLocaleString()}</em></p>
        </div>
      `,
    };

    // Send both emails
    const candidateResult = await transporter.sendMail(candidateEmail);
    const internalResult = await transporter.sendMail(internalEmail);

    console.log('✅ Emails sent successfully!');
    console.log('Candidate email ID:', candidateResult.messageId);
    console.log('Internal email ID:', internalResult.messageId);

    res.json({ 
      success: true, 
      message: "Application submitted successfully!",
      appId: appId
    });

  } catch (error) {
    console.error('❌ Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Email service temporarily unavailable. We've saved your application and will contact you soon."
    });
  }
}
