//imports
const { Router } = require("express");
const { body, query, header } = require("express-validator");
//controllers
const {
	getTransactions,
	newTransaction,
} = require("../controllers/transactions");
//middlewares
const { errorHandler } = require("../middlewares/EVErrorHandler");
const { singleQuery } = require("../middlewares/checkers");
//validators
const { userExists, transactionExists } = require("../helpers/db-validators");
const { verifyJWT } = require("../helpers/jwt-validator");

//Rutas
const router = Router();

router.get(
	"/",
	[
		singleQuery,
		header("x-token").bail().custom(verifyJWT),
		query("accountID").optional().custom(userExists),
		query("transactionID")
			.optional()
			.isMongoId()
			.withMessage("El id no es válido")
			.bail()
			.custom(transactionExists),
	],
	errorHandler,
	getTransactions
);

router.post(
	"/",
	[
		header("x-token").custom(verifyJWT),
		body("sender")
			.notEmpty()
			.withMessage("El ID sender es obligatorio")
			.bail()
			.isLength({ min: 4, max: 4 })
			.withMessage("El ID consta de 4 caractéres")
			.bail()
			.custom(userExists),
		body("receiver")
			.notEmpty()
			.withMessage("El ID receiver es obligatorio")
			.bail()
			.isLength({ min: 4, max: 4 })
			.withMessage("El ID consta de 4 caractéres")
			.bail()
			.custom(userExists),
		body("ammount")
			.notEmpty()
			.withMessage("El monto es obligatorio")
			.bail()
			.isNumeric()
			.withMessage("El monto debe ser un número")
			.notEmpty()
			.withMessage("El monto es obligatorio"),
	],
	errorHandler,
	newTransaction
);

// router.post("/prueba", [], errorHandler, (req, res) => {
// 	res.send("hola");
// });

module.exports = router;
