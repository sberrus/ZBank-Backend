const { Router } = require("express");
const {
	getTransactions,
	newTransaction,
} = require("../controllers/transactions");
const router = Router();

router.get("/", getTransactions);

module.exports = router;
