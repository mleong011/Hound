const express = require("express");
const router = express.Router();

//Load each controller
const userController = require('./users.js');
const orderController = require('./orders.js');
const googlelogin = require("./auth.js");

// Mount each controller under a specific route. These
// will be prefixes to all routes defined inside the controller
router.use('/users', userController);
router.use('/orders', orderController);
router.use('/googlelogin', googlelogin);



module.exports = router;
