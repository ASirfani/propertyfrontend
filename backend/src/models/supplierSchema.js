const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema({
    name: { type: String},
    fatherName: { type: String},
    password: { type: String, required: true },
    idcard: { type: String},
    address: { type: String},
    phoneNumber: { type: String },
    email: { type: String, required: true },
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
