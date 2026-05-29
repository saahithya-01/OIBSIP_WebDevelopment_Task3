const cron = require('node-cron');
const Inventory = require('../models/Inventory');
const sendEmail = require('./sendEmail');

module.exports = () => {

  cron.schedule('0 * * * *', async () => {

    const lowStock = await Inventory.find({
      quantity: { $lt: 20 }
    });

    if (lowStock.length > 0) {

      let message = 'Low Stock Items:\n';

      lowStock.forEach(item => {
        message += `${item.item} - ${item.quantity}\n`;
      });

      await sendEmail(
        process.env.ADMIN_EMAIL,
        'Low Stock Alert',
        message
      );
    }
  });
};