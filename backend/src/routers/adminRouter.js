const express = require('express');
const router = express.Router();
const Admin = require('../models/adminSchema');

// GET route to retrieve all admins
router.get('/admins', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route to retrieve a specific admin by ID
router.get('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST route to create a new admin
router.post('/admin', async (req, res) => {
    const admin = new Admin({
        username: req.body.username,
        password: req.body.password,
    });

    try {
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    try {
      const admin = await Admin.findOne({username});
  
      if (!admin) {
        return res.status(201).json({ message: 'Invalid credentials' });
      }
      
      const passwordMatch = password === admin.password;
      
      if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful' });
      } else {
        return res.json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// PUT route to update a specific admin by ID
router.put('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE route to delete a specific admin by ID
router.delete('/admin/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
