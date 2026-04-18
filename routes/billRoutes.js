const express = require('express');
const router = express.Router();

const {
  createBill,
  getBills,
  getBill,
  deleteBill
} = require('../controllers/billController');

// Create bill
router.post('/', createBill);

// Get all bills
router.get('/', getBills);

// Get single bill
router.get('/:id', getBill);

// Delete bill (optional)
router.delete('/:id', deleteBill);

module.exports = router;