//imports
const { Router } = require("express");
const { body } = require("express-validator");
//controllers
const {
	getTransactions,
	newTransaction,
} = require("../controllers/transactions");
//middlewares
const { errorHandler } = require("../middlewares/EVErrorHandler");
const { singleQuery } = require("../middlewares/checkers");
//validators
const { userExists } = require("../helpers/db-validators");

//Rutas
const router = Router();

router.get("/", singleQuery, getTransactions);

router.post(
	"/",
	[
		body("sender")
			.notEmpty()
			.withMessage("El ID sender es obligatorio")
			.isLength({ min: 4, max: 4 })
			.withMessage("El ID consta de 4 caractéres")
			.bail()
			.custom(userExists),
		body("receiver")
			.notEmpty()
			.withMessage("El ID receiver es obligatorio")
			.isLength({ min: 4, max: 4 })
			.withMessage("El ID consta de 4 caractéres")
			.bail()
			.custom(userExists),
		body("ammount")
			.isNumeric()
			.notEmpty()
			.withMessage("El monto es obligatorio"),
	],
	errorHandler,
	newTransaction
);

module.exports = router;
