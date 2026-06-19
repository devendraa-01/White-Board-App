const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // We will store the hashed password here
    otp: { type: String, required: true },
    createdAt: { 
        type: Date, 
        default: Date.now, 
        expires: 600 // Automatically deletes the document after 10 minutes
    }
});

module.exports = mongoose.model('Otp', otpSchema);