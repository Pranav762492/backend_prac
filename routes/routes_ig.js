const express = require('express');
const router = express.Router();

const { generateText, generateImage } = require('../controllers/image_generation');

// POST /api/generate-text
router.post('/generate-text', generateText);

// POST /api/generate-image
router.post('/generate-image', generateImage);

module.exports = router;
