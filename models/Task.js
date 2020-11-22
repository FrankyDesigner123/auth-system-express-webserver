// import mongoose
const mongoose = require('mongoose');

// create constance where we create new instance of mongoose.Schema
// in the Schema we define the shape of the data
const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	course: {
		type: String,
		required: true,
	},
	description: {
		String,
	},
});

// when we want to interact with this database we can create an instance of this Schema
module.exports = mongoose.model('Task', TaskSchema);
