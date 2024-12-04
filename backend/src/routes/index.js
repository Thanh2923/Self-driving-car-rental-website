const express = require('express');
const router = express.Router();

// Import các routes
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const carRoutes = require('./carRoutes');
const bookingRoutes = require('./bookingRoutes');
const paymentRoutes = require('./paymentRoutes');
const eventRoutes = require('./eventRoutes');
const categoryRoutes = require('./categoryRoutes')
// Định nghĩa các route
router.use('/user', userRoutes);
router.use('/role', roleRoutes);
router.use('/car', carRoutes);
router.use('/booking', bookingRoutes);
router.use('/payment', paymentRoutes);
router.use('/event', eventRoutes);
router.use('/category', categoryRoutes);

module.exports = router;
