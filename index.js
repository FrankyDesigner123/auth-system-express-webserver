// set up express app
const express = require('express');

// init express app.
const app = express();

// import router
const authRoutes = require('./routes/auth');

// create first route
app.get('/', (req, res) => {
	res.send('Welcome to the auth system');
});

// use middleware
// when users makes a req to api/users, we want the req to be handle by authRoutes
app.use('/api/users/', authRoutes);

// define the port
app.listen(3000, () => console.log('Server is running.'));
