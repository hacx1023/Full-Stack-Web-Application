const express = require('express');
const router = express.Router();
const Portfolio = require('../models/Portfolio');
const mongoose = require('mongoose');

// @desc    Get all portfolios (usually just one for the owner)
// @route   GET /api/portfolio
// @access  Public
router.get('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.json([]);
        }
        const portfolios = await Portfolio.find({});
        res.json(portfolios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get a single portfolio profile by userId
// @route   GET /api/portfolio/:userId
// @access  Public
router.get('/:userId', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({ message: 'DB Offline' });
        }
        const portfolio = await Portfolio.findOne({ user: req.params.userId });
        if (!portfolio) {
            return res.status(404).json({ message: 'No portfolio found' });
        }
        res.json(portfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a portfolio profile
// @route   POST /api/portfolio
// @access  Public (for initial setup)
router.post('/', async (req, res) => {
    try {
        if (mongoose.connection.readyState !== 1) {
            return res.status(201).json(req.body);
        }
        const portfolio = new Portfolio(req.body);
        const createdPortfolio = await portfolio.save();
        res.status(201).json(createdPortfolio);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update a portfolio profile
// @route   PUT /api/portfolio/:userId
// @access  Public (Mocked Auth wrapper)
router.put('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Handle mock offline mode logic
        if (mongoose.connection.readyState !== 1) {
            return res.status(200).json({ message: "Mock updated", updatedPortfolio: req.body });
        }

        let portfolio = await Portfolio.findOne({ user: userId });
        
        if (!portfolio) {
            // User's first time saving: create the document
            portfolio = new Portfolio({ user: userId, ...req.body });
            const savedPortfolio = await portfolio.save();
            return res.status(201).json(savedPortfolio);
        }

        Object.assign(portfolio, req.body);
        const updatedPortfolio = await portfolio.save();
        res.json(updatedPortfolio);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
