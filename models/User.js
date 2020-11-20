// define Schema

// import mongoose
const mongoose = require('mongoose');

// create instance of this class and store it in constance
const userSchema = new mongoose.Schema({
	fullName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
});

// export Schema
module.exports = mongoose.model('User', userSchema);
