// import express
const express = require('express');

// init express.Router
const router = express.Router();

// create the register route
router.post('/register', (req, res) => {
	res.send('Register route.');
});

// create the login route
router.post('/login', (req, res) => {
	res.send('Login Route.');
});

// export router
module.exports = router;
