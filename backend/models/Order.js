const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema({

    pizza: {

      base: String,

      sauce: String,

      cheese: String,

      veggies: [String],
    },

    amount: Number,

    status: {
      type: String,
      default: "Order Received",
    },

  });

module.exports = mongoose.model(
  "Order",
  orderSchema
);