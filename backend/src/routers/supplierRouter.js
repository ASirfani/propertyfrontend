const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierSchema');

// GET route to retrieve all suppliers
router.get('/suppliers', async (req, res) => {
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
        fatherName:req.body.fatherName,
        password:req.body.password,
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

//login check
router.post('/suppliers/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const supplier = await Supplier.findOne({email});
  
      if (!supplier) {
        return res.status(201).json({ message: 'Invalid credentials' });
      }
      
      const passwordMatch = password === supplier.password;
      
      if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
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
