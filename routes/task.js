// import express package
const express = require('express');

// import Task model
const Task = require('../models/Task');

// init the router
const router = express.Router();

// create Task Data
router.post('/todo', (req, res) => {
	// dummy data
	res.send([
		{ title: 'Taak 1', course: 'Web 3', description: 'Prototype afwerken.' },
	]);
});

// we need to export it so we can make use of it in index.js
module.exports = router;
