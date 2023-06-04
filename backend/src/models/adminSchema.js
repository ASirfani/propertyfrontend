const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    // Additional fields for admin if needed
});

const Admin = mongoose.model('Admin',adminSchema);

module.exports = Admin;