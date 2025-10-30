const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fetch = require('node-fetch');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Environment Variables
const FAST2SMS_API_KEY = 'DX2YUHitABzNk809GQOfPolqwJaVdC6RnsKZcIWTbgpm7xESLexvGoOKmi9klT8grBs5U0ncAHbfd4St';
const MONGODB_URI = 'mongodb+srv://rudraravi121:samsungz12@cluster0.jlpop06.mongodb.net/sparkinvoice?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err.message));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    businessName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    verified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// OTP Schema
const otpSchema = new mongoose.Schema({
    email: String,
    phone: String,
    otp: String,
    expiry: Date,
    createdAt: { type: Date, default: Date.now }
});

const OTP = mongoose.model('OTP', otpSchema);

// ✅ SMS OTP SEND - REAL MOBILE OTP
app.post('/api/send-sms-otp', async (req, res) => {
    try {
        const { phone, otp } = req.body;
        
        console.log("📱 Backend: Sending SMS to:", phone);
        
        // Fast2SMS API Call
        const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
            method: "POST",
            headers: {
                "authorization": FAST2SMS_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                route: "q",
                message: `Your SparkInvoice OTP is ${otp}. Valid for 2 minutes.`,
                language: "english",
                flash: 0,
                numbers: phone
            })
        });
        
        const result = await response.json();
        console.log("📦 Fast2SMS Response:", result);
        
        if (result.return === true) {
            res.json({ 
                success: true, 
                message: 'OTP sent successfully to mobile' 
            });
        } else {
            res.json({ 
                success: false, 
                message: result.message || 'Failed to send OTP'
            });
        }
        
    } catch (error) {
        console.error('❌ SMS Error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'SMS service error' 
        });
    }
});

// Check User Exists
app.post('/api/check-user', async (req, res) => {
    try {
        const { phone, email } = req.body;
        
        const existingUser = await User.findOne({ 
            $or: [{ phone: phone }, { email: email }] 
        });
        
        res.json({ 
            exists: !!existingUser 
        });
        
    } catch (error) {
        res.status(500).json({ 
            exists: false,
            error: 'Check failed' 
        });
    }
});

// User Registration
app.post('/api/register', async (req, res) => {
    try {
        const { name, businessName, email, phone, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { phone }] 
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'User already exists with this email/phone'
            });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);
        
        // Create user
        const newUser = new User({
            name,
            businessName,
            email,
            phone,
            password: hashedPassword,
            verified: true
        });
        
        await newUser.save();
        
        res.json({
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                phone: newUser.phone,
                businessName: newUser.businessName
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            error: 'Registration failed'
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 SMS OTP API: http://localhost:${PORT}/api/send-sms-otp`);
});