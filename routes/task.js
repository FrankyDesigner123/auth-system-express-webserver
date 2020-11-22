// import express package
const express = require('express');

// import Task model
const Task = require('../models/Task');

// init the router
const router = express.Router();

// create Task Data
router.post('/todo', async (req, res) => {
	const task = new Task({
		title: req.body.title,
		course: req.body.course,
		description: req.body.description,
	});

	try {
		const savedTask = await task.save();
		res.send(savedTask);
	} catch (error) {
		res.status(400).send(error);
	}
});

// we need to export it so we can make use of it in index.js
module.exports = router;
