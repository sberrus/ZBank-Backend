//imports
const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");
const newTransactionSchema = require("../ddbb/schemas/newTransactionSchema");
const newUserSchema = require("../ddbb/schemas/newUserSchema");

//helpers
const data = require("../helpers/transactions");

//Get all transactions if you dont send the query id. If you send the query "id" you will get the info of that transaction
const getTransactions = (req = request, res = response) => {
	//url querys
	const { transactionID, accountID } = req.query;

	//todo: comprobar que el id existe antes de comprobar

	//comprueba que solo se envie un parámetro.
	if (transactionID && accountID)
		return res
			.status(400)
			.json({ error: "Demasiados parametros para la consulta" });

	//Obtiene una unica transacción **Ver si podemos mejorar esto en el front
	if (transactionID) {
		return res.json({ transactionID });
	}

	//Obtiene las transacciones de un usuario
	if (accountID) {
		return res.json({ accountID });
	}

	//Obtiene todas las transacciones de todos los usuarios.
	res.json(data);
};

const newTransaction = (req = request, res = response) => {
	let { sender, receiver, ammount } = req.body;

	//todo: sanitizar datos

	//todo: comprobar que el sender exista y tenga el dinero.

	//todo: comprobar que el receiver exista.

	//todo: procesar transacción.
	const transaction = new newTransactionSchema({
		transactionID: uuidv4().split("-")[4],
		sender,
		receiver,
		date: new Date().toISOString(),
		ammount,
	});
	transaction.save();

	res.json(transaction);
};

module.exports = {
	getTransactions,
	newTransaction,
};
