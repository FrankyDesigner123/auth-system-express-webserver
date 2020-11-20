// import express.
const express = require('express');

// init express.Router
const router = express.Router();

// import model User
// with this User model we can interact with database
const User = require('../models/User');

// create the register route
router.post('/register', async (req, res) => {
	// create const of user and instance of this user model
	const user = new User({
		// set the propperties
		fullName: req.body.fullName,
		email: req.body.email,
		password: req.body.password,
		role: req.body.role,
	});

	// save the user
	try {
		const savedUser = await user.save();
		// send back savedUser
		res.send(savedUser);
	} catch (error) {
		res.status(400).send(error);
	}
});

// create the login route
router.post('/login', (req, res) => {
	res.send('Login Route.');
});

// export router
module.exports = router;
