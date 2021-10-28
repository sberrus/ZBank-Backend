//imports
const { Router } = require("express");
const { body, query } = require("express-validator");
//Schemas
const User = require("../ddbb/schemas/User");
//controllers
const { getUsers, newUser } = require("../controllers/users");
//helpers
const { errorHandler } = require("../middlewares/EVErrorHandler");
const { userExists, usernameIsUnique } = require("../helpers/db-validators");

//router
const router = Router();

router.get(
	"/",
	[query("userID").optional().custom(userExists), errorHandler],
	getUsers
);
router.post(
	"/",
	[
		body("username")
			.notEmpty()
			// .bail()
			.withMessage("El campo username es obligatorio")
			.custom(usernameIsUnique),
		body("password")
			.notEmpty()
			.withMessage("El campo password es obligatorio"),
		errorHandler,
	],
	newUser
);

module.exports = router;
