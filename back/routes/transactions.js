const { Router } = require("express");
const {
	getTransactions,
	newTransaction,
} = require("../controllers/transactions");
const router = Router();

//Obtiene todas las transacciones y obtiene una unica transacción si enviamos el id de la misma.
router.get("/", getTransactions);

//Crea una nueva transacción.
router.post("/", newTransaction);


module.exports = router;
