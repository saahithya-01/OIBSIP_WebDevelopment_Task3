const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const inventoryRoutes = require("./routes/inventoryRoutes");

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*'
  }
});
app.use(
  "/api/inventory",
  inventoryRoutes
);

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {

  console.log('MongoDB Connected');

  server.listen(process.env.PORT, () => {
    console.log(`Server running on ${process.env.PORT}`);
  });

})
.catch((err) => {
  console.log(err);
});