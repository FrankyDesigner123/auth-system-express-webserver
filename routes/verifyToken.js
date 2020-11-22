const jwt = require('jsonwebtoken');

// export function that takes req, res, next
module.exports = function (req, res, next) {
	// grab token from header form the req
	const token = req.header('auth-token');

	// if token does not exist
	if (!token) return res.status(401).send('Access Denied.');

	// verify the token
	try {
		// verify token that is passed from header
		const verified = jwt.verify(token, 'SECRET_KEY');
		// attach token to the body of res
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).send('Invalid Token.');
	}
};
