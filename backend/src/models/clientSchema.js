const mongoose = require('mongoose');

// Define the schema
const clientSchema = new mongoose.Schema({
    serialNumber: { type: String, default: () => Math.floor(10000 + Math.random() * 90000) },
    date: { type: Date, default: Date.now },
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    address: { type: String, required: true },
    idCard: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    bookingFee: { type: Number, required: true },
    houseNumber: { type: String, required: true },
    role: { type: String, required: true ,default:'pending' },
});

// Create a model based on the schema
const clientModel = mongoose.model('Client', clientSchema);

// Export the model
module.exports = clientModel;
