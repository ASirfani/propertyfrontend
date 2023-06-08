const express = require('express');
const router = express.Router();
const clientModel = require('../models/clientSchema');
const authMiddleware = require('./authMiddleware ');


// GET route to retrieve all clients
router.get('/clients',authMiddleware , async (req, res) => {
    try {
        const clients = await clientModel.find();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route to retrieve a specific client
router.get('/clients/:id', async (req, res) => {
    try {
        const client = await clientModel.findById(req.params.id);
        if (client) {
            res.json(client);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST route to create a new client
router.post('/clients/save', async (req, res) => {
    const client = new clientModel({
        date: req.body.date,
        name: req.body.name,
        fatherName: req.body.fatherName,
        address: req.body.address,
        idCard: req.body.idCard,
        phoneNumber: req.body.phoneNumber,
        bookingFee: req.body.bookingFee,
        houseNumber: req.body.houseNumber,
        role:req.body.role,
    });

    try {
        const newClient = await client.save();
        res.status(201).json(newClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT route to update a client
router.put('/clients/:id', async (req, res) => {
    try {
        const client = await clientModel.findById(req.params.id);
        if (client) {
            client.date = req.body.date;
            client.name = req.body.name;
            client.fatherName = req.body.fatherName;
            client.address = req.body.address;
            client.idCard = req.body.idCard;
            client.phoneNumber = req.body.phoneNumber;
            client.bookingFee = req.body.bookingFee;
            client.houseNumber = req.body.houseNumber;
            client.role = req.body.role;

            const updatedClient = await client.save();
            res.json(updatedClient);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE route to delete a client
router.delete('/clients/:id', async (req, res) => {
    try {
        const client = await clientModel.findById(req.params.id);
        if (client) {
            await client.remove();
            res.json({ message: 'Client deleted' });
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
