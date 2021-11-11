//imports
const { Router } = require("express");
const { body, query, header } = require("express-validator");
//controllers
const { getUsers, newUser } = require("../controllers/users");
//helpers
const { verifyJWT } = require("../helpers/jwt-validator");
const { usernameIsUnique } = require("../helpers/db-validators");
//middlewares
const { errorHandler } = require("../middlewares/EVErrorHandler");
const { passwordVerification } = require("../middlewares/validations");

//router
const router = Router();

//get User
router.get(
	"/",
	[
		header("x-token")
			.notEmpty()
			.withMessage("Token obligatorio")
			.bail()
			.custom(verifyJWT),
		query("userID").optional(),
	],
	errorHandler,
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
