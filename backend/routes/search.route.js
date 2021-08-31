const express = require('express');

const searchMiddleware = require('../middlewares/search.middleware.js');


const router = express.Router();

//Main
router.post("/test", searchMiddleware.postSubReddit)

module.exports = router;
