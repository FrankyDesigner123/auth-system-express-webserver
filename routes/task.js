// import express package
const express = require('express');

// import components from express-validator
const { check, validationResult } = require('express-validator');

// init the router
const router = express.Router();

// import Task model
const Task = require('../models/Task');

// create task validation
const validate = [
	check('title').isLength({ min: 3 }).withMessage('A title is required.'),
	check('course').isLength({ min: 3 }).withMessage('A Course is required'),
	check('description')
		.isLength({ min: 3 })
		.withMessage('A description is required'),
];

// create Task Data
router.post('/todo', validate, async (req, res) => {
	// check if the req passes the validation
	const errors = validationResult(req);
	// logic to check if there are errors in validation
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	// create const of task and instance of this task model
	const task = new Task({
		title: req.body.title,
		course: req.body.course,
		description: req.body.description,
	});

	// save the task
	try {
		const savedTask = await task.save();
		res.send({
			message: 'Task created succesfully.',
			data: savedTask,
		});
	} catch (error) {
		res.status(400).send(error);
	}
});

// fetch Task data
router.get('/', (req, res) => {
	Task.find()
		.then((tasks) => {
			res.send(tasks);
		})
		.catch((err) => console.log(err));
});

// fetch Task per ID
router.get('/:id', (req, res) => {
	const taskId = req.params.id;

	Task.findById(taskId)
		.then((task) => {
			res.send(task);
		})
		.catch((err) => console.log(err));
});

// we need to export it so we can make use of it in index.js
module.exports = router;
