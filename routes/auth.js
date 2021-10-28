//Imports
const { Router } = require("express");
const { check } = require("express-validator");
//helpers
const { userIsActive } = require("../helpers/db-validators");
//middlewares
const { errorHandler } = require("../middlewares/EVErrorHandler");
//controllers
const { login } = require("../controllers/auth");
//rutas
const router = Router();

router.post(
	"/",
	[
		check("username")
			.notEmpty()
			.withMessage("Error al iniciar sesión - Usuario")
			.custom(userIsActive),
		check("password")
			.notEmpty()
			.withMessage("Error al iniciar sesión - Password"),
		errorHandler,
	],
	login
);

module.exports = router;
