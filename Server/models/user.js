const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'transporter', 'computer_operator'],
        required: true,
    },
    name: { type: String },
    email: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
