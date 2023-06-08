const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Supplier = require('../models/supplierSchema');
const authMiddleware = require('./authMiddleware ');
const jwtSecret = "abbasaliirfani";


// GET route to retrieve all suppliers
router.get('/suppliers' , authMiddleware ,async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET route to retrieve a specific supplier by ID
router.get('/supplier/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST route to create a new supplier
router.post('/suppliers/save', async (req, res) => {
  const supplier = new Supplier({
    name: req.body.name,
    fatherName: req.body.fatherName,
    password: req.body.password,
    idcard: req.body.idcard,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  });

  try {
    const newSupplier = await supplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//login check and ganerate token
router.post('/suppliers/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const supplier = await Supplier.findOne({ email });
    if (supplier && password === supplier.password) {
      const payload = { id: supplier._id, name: supplier.name, email: supplier.email };
      const token = jwt.sign(payload, jwtSecret);
      return res.json({ message: "login Success", token, type: 'Bearar' });
    }
    return res.status(403).json({ error: "Invalid Email or Password" });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});






// PUT route to update a specific supplier by ID
router.put('/supplier/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete a specific supplier by ID
router.delete('/supplier/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.json({ message: 'Supplier deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
