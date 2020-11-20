// import express.
const express = require('express');

// import comopnents from express-validator
const { check, validationResult } = require('express-validator');

// import bcrypt
const bcrypt = require('bcryptjs');

// init express.Router
const router = express.Router();

// import model User
// with this User model we can interact with database
const User = require('../models/User');

// create registration validation
const registerValidation = [
	// define validation
	check('fullName')
		.isLength({ min: 2 })
		.withMessage('Your full name is required.'),
	check('email').isEmail().withMessage('Please provide a valid email.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters.'),
];

// create login validation
const loginValidation = [
	// define validation
	check('email').isEmail().withMessage('Please provide a valid email.'),
	check('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters.'),
];

// create the register route
router.post('/register', registerValidation, async (req, res) => {
	// check if req passes the validation
	const errors = validationResult(req);

	// logic to check if there are errors (not passing validation)
	if (!errors.isEmpty()) {
		return res.status(422).json({ erros: errors.array() });
	}

	// generate a salt (random string)
	const salt = await bcrypt.genSalt();

	// make use of salt to hash password
	const hashPassword = await bcrypt.hash(req.body.password, salt);

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
		password: hashPassword,
		role: req.body.role,
	});

	// save the user
	try {
		const savedUser = await user.save();
		// send back savedUser
		res.send({
			// not good to send back savedUser object where password is in, so we send the prop we want to show
			id: savedUser._id,
			fullName: savedUser.fullName,
			email: savedUser.email,
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

// create the login route
router.post('/login', loginValidation, async (req, res) => {
	// check if req passes the validation
	const errors = validationResult(req);

	// logic to check if there are errors (not passing validation)
	if (!errors.isEmpty()) {
		return res.status(422).json({ erros: errors.array() });
	}

	// check if email exist
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return res.status(404).send('User is not registered.');
	}
	// check if password correct
	const validPassword = await bcrypt.compare(req.body.password, user.password);

	if (!validPassword) {
		return res.status(404).send('Invalid Email or Password');
	}
	return res.send('Logged in ...');
});

// export router
module.exports = router;
