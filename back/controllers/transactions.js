//imports
const { request, response } = require("express");
const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const TransactionSchema = require("../ddbb/schemas/transactionSchema");
const UserSchema = require("../ddbb/schemas/userSchema");

//obtiene todas las transacciones. Unica transacción o las transacciones de un usuario.
const getTransactions = async (req = request, res = response) => {
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
		const receiverData = await UserSchema.findOne({ userID: receiver });
		if (!receiverData) {
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
		const senderData = await UserSchema.findOne({ userID: sender });
		if (!senderData) {
			return res.status(400).json({ error: "ID Sender Incorrecto" });
		}
		//validar que el sender tenga dinero
		if (senderData.balance < ammount) {
			return res.status(400).json({ error: "Estas pelando bolas" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error en el servidor", error });
	}

	//todo: actualizar balance del usuario

	//registrar en la BBDD la transacción
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
