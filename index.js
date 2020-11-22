// mongoDB login
// username: master-admin
// ps: BvoxRbBiPw8848X5

// set up express app
const express = require('express');

// import mongoose
const mongoose = require('mongoose');

// init express app.
const app = express();

// pass the body of request (express.json() is middleware we pass)
app.use(express.json());

// import router
const authRoutes = require('./routes/auth');

// import middleware
const verifyToken = require('./routes/verifyToken');

// create first route
app.get('/', (req, res) => {
	res.send('Welcome to the auth system');
});

// create route to check profile
app.get('/api/users/profile', verifyToken, (req, res) => {
	res.send({ success: true, data: req.user });
});

// use middleware
// when users makes a req to api/users, we want the req to be handle by authRoutes
app.use('/api/users/', authRoutes);

// use mongoose to connect to mongoDB
mongoose
	.connect(
		'mongodb+srv://master-admin:BvoxRbBiPw8848X5@cluster0.g20n5.mongodb.net/auth-system?retryWrites=true&w=majority',
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		// define the port
		app.listen(3000, () => console.log('Server is running.'));
	})
	.catch((err) => console.log(err));
