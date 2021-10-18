//imports
const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");
const TransactionSchema = require("../ddbb/schemas/transactionSchema");
const UserSchema = require("../ddbb/schemas/userSchema");

//Get all transactions if you dont send the query id. If you send the query "id" you will get the info of that transaction
const getTransactions = async (req = request, res = response) => {
	//url querys
	const { transactionID, accountID } = req.query;

	//comprueba que solo se envie un parámetro.
	if (transactionID && accountID)
		return res
			.status(400)
			.json({ error: "Demasiados parametros para la consulta" });

	try {
		const DBtransactions = await TransactionSchema.find();

		//Obtiene una unica transacción
		//todo: Ver si podemos mejorar esto en el front
		if (transactionID) {
			const uniquetransaction = DBtransactions.filter(
				(transaction) => transaction.transactionID === transactionID
			);
			return res.json(uniquetransaction[0]);
		}

		//Obtiene las transacciones de un usuario
		if (accountID) {
			const userTransactions = DBtransactions.filter(
				(transaction) =>
					transaction.sender === accountID ||
					transaction.receiver === accountID
			);
			return res.json(userTransactions);
		}
		//Obtiene todas las transacciones de todos los usuarios.
		res.json(DBtransactions);
	} catch (error) {
		console.log(error);
	}
};

const newTransaction = async (req = request, res = response) => {
	let { sender, receiver, ammount } = req.body;

	//validar que el receiver exista.
	try {
		const userReceiver = await UserSchema.findOne({ userID: receiver });
		if (!userReceiver) {
			return res
				.status(400)
				.json({ error: "ID receiver incorrecto o inexistente" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error en el servidor", error });
	}

	//validar type de ammount
	if (typeof ammount !== "number") {
		return res.status(400).json({ error: "El monto debe ser un INT" });
	}

	//validar que el sender exista
	try {
		const userSender = await UserSchema.findOne({ userID: sender });
		if (!userSender) {
			return res.status(400).json({ error: "ID Sender Incorrecto" });
		}
		//validar que el sender tenga dinero
		if (userSender.balance < ammount) {
			return res.status(400).json({ error: "Estas pelando bolas" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error en el servidor", error });
	}

	const transaction = new TransactionSchema({
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
