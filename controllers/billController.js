const Bill = require('../models/Bill');

exports.createBill = async (req, res) => {
  try {
    const { customerName, customerPhone, items, subtotal, gst, total, date } = req.body;

    const bill = new Bill({
      customerName,
      customerPhone,
      items,
      subtotal,
      gst,
      total,
      date: date || new Date()
    });

    await bill.save();

    res.status(201).json(bill);

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .sort({ createdAt: -1 });

    res.json(bills);

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }

    res.json(bill);

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: 'Bill not found'
      });
    }

    res.json({ 
      success: true,
      message: "Bill deleted successfully" 
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};