const { validationResult } = require("express-validator");

const errorHandler = (req, res, next) => {
	const results = validationResult(req);
	if (!results.isEmpty()) {
		return res.status(400).json(results.array());
	}
	next();
};

module.exports = { errorHandler };
