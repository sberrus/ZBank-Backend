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
const { passwordVerification } = require("../middlewares/validations");

//router
const router = Router();

//get User
router.get(
	"/",
	[query("userID").optional().custom(userExists), errorHandler],
	getUsers
);

//Register new user
router.post(
	"/",
	[
		body("password")
			.notEmpty()
			.withMessage("El campo password es obligatorio"),
		body("passwordConfirm")
			.notEmpty()
			.withMessage("El campo passwordConfirm es obligatorio"),
		passwordVerification,
		body("username")
			.notEmpty()
			// .bail()
			.withMessage("El campo username es obligatorio")
			.custom(usernameIsUnique),
		errorHandler,
	],
	newUser
);

module.exports = router;
