// import express.
const express = require('express');

// import comopnents from express-validator
const { check, validationResult } = require('express-validator');

// init express.Router
const router = express.Router();

// import model User
// with this User model we can interact with database
const User = require('../models/User');

// create validation
const validate = [
	// define validation
	check('fullName')
		.isLength({ min: 2 })
		.withMessage('Your full name is required.'),
	check('email').isEmail().withMessage('Please provide a valid email.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters.'),
];

// create the register route
router.post('/register', validate, async (req, res) => {
	// check if req passes the validation
	const errors = validationResult(req);

	// logic to check if there are errors (not passing validation)
	if (!errors.isEmpty()) {
		return res.status(422).json({ erros: errors.array() });
	}

	// check if userEmail exist
	const userExist = await User.findOne({ email: req.body.email }); // check if email exist in database
	if (userExist) {
		return res.status(400).send('Email already exist.');
	}

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
