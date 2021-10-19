const { Router } = require("express");
const { body } = require("express-validator");
const {
	getTransactions,
	newTransaction,
} = require("../controllers/transactions");
const { errorHandler } = require("../middlewares/EVErrorHandler");
const router = Router();

//Obtiene todas las transacciones y obtiene una unica transacción si enviamos el id de la misma.
router.get("/", getTransactions);

//Crea una nueva transacción.
router.post(
	"/",
	//todo: modular los handlers
	[
		body("sender")
			.notEmpty()
			.withMessage("El ID sender es obligatorio")
			.isLength({ min: 4, max: 4 })
			.withMessage("El ID consta de 4 caractéres"),
		body("receiver")
			.notEmpty()
			.withMessage("El ID receiver es obligatorio")
			.isLength({ min: 4, max: 4 })
			.withMessage("El ID consta de 4 caractéres"),
		body("ammount").notEmpty().withMessage("El monto es obligatorio"),
	],
	errorHandler,
	newTransaction
);

module.exports = router;
