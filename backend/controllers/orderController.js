const Razorpay = require('razorpay');
const Order = require('../models/Order');
const Inventory = require('../models/Inventory');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

exports.createPayment = async (req, res) => {

  const options = {
    amount: req.body.amount * 100,
    currency: 'INR'
  };

  const order = await razorpay.orders.create(options);

  res.json(order);
};

exports.placeOrder = async (req, res) => {

  const order = await Order.create({
    userId: req.user.id,
    pizza: req.body.pizza,
    amount: req.body.amount
  });

  await Inventory.updateOne({ item: req.body.pizza.base },
    { $inc: { quantity: -1 } }
  );

  req.io.emit('statusChanged', order);

  res.json(order);
};

exports.updateStatus = async (req, res) => {

  const order = await Order.findById(req.params.id);

  order.status = req.body.status;

  await order.save();

  req.io.emit('statusChanged', order);

  res.json(order);
};