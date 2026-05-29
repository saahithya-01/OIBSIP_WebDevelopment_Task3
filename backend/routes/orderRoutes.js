const express = require("express");

const router = express.Router();

const Order = require("../models/Order");

router.post("/create", async (
  req,
  res
) => {

  try {

    const order =
      new Order(req.body);

    await order.save();

    res.json({
      success: true,
    });

  } catch (err) {

    console.log(err);
  }
});

router.get("/all", async (
  req,
  res
) => {

  const orders =
    await Order.find();

  res.json(orders);
});

router.put(
  "/status/:id",

  async (req, res) => {

    await Order.findByIdAndUpdate(
      req.params.id,

      {
        status:
          req.body.status,
      }
    );

    res.json({
      success: true,
    });
  }
);

module.exports = router;