const Bill = require('../models/Bill');

exports.createBill = async (req, res) => {
  const bill = new Bill(req.body);
  await bill.save();
  res.json(bill);
};

exports.getBills = async (req, res) => {
  const bills = await Bill.find().sort({ createdAt: -1 });
  res.json(bills);
};
