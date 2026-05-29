const express = require("express");

const router = express.Router();

const Inventory =
  require("../models/Inventory");

router.get("/", async (
  req,
  res
) => {

  const items =
    await Inventory.find();

  res.json(items);
});

router.post("/add", async (
  req,
  res
) => {

  const item =
    new Inventory(req.body);

  await item.save();

  res.json({
    success: true,
  });
});

module.exports = router;