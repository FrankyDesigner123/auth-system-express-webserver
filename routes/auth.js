// import express.
const express = require('express');

// import comopnents from express-validator
const { check, validationResult } = require('express-validator');

// import bcrypt
const bcrypt = require('bcryptjs');

// import jsonwebstoken
const jwt = require('jsonwebtoken');

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
		return res
			.status(400)
			.send({ success: false, message: 'Email already exist.' });
	}

	// create const of user and instance of this user model
	const user = new User({
		// set the propperties
		fullName: req.body.fullName,
		email: req.body.email,
		password: hashPassword,
		role: req.body.role.default,
	});

	// save the user
	try {
		const savedUser = await user.save();
		// send back savedUser
		res.send({
			success: true,
			data: {
				// not good to send back savedUser object where password is in, so we send the prop we want to show
				id: savedUser._id,
				fullName: savedUser.fullName,
				email: savedUser.email,
				role: savedUser.role,
			},
		});
	} catch (error) {
		res.status(400).send({ success: false, error });
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
		return res
			.status(404)
			.send({ success: false, message: 'User is not registered.' });
	}
	// check if password correct
	const validPassword = await bcrypt.compare(req.body.password, user.password);

	if (!validPassword) {
		return res
			.status(404)
			.send({ success: false, message: 'Invalid Email or Password.' });
	}

	// create and assign a token
	const token = jwt.sign(
		// payload
		{
			_id: user._id,
			email: user.email,
			role: user.role,
		},
		// this is the key for encoding the token
		'SECRET_KEY'
	);
	// send back to the user
	res
		.header('auth-token', token) // attach token in the header
		.send({ success: true, message: 'Logged in ...', token }); // send token to body of response
	// return res.send({ success: true, message: 'Logged in ...' });
});

// get user profile
router.use('/profile/:id', (req, res) => {
	const userId = req.params.id;
	console.log(userId);

	User.findById(userId)
		.then((user) => {
			res.send(user);
			console.log(user);
		})
		.catch((err) => console.log(err));
});

// export router
module.exports = router;
