//Imports
const { request, response } = require("express");
//Helpers
const { v4: uuidv4 } = require("uuid");
//Schemas
const Transaction = require("../ddbb/schemas/Transaction");
const User = require("../ddbb/schemas/User");

//Controllers
const getTransactions = async (req = request, res = response) => {
	const { transactionID, accountID } = req.query;

	try {
		const DBtransactions = await Transaction.find();
		//Obtiene una unica transacción
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
	let senderData, receiverData;

	try {
		receiverData = await User.findOne({ userID: receiver });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error en el servidor", error });
	}

	try {
		senderData = await User.findOne({ userID: sender });
		//check if sender has money
		if (senderData.balance < ammount) {
			return res.status(400).json({ error: "Estas pelando bolas" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error en el servidor", error });
	}

	const senderID = senderData.userID;
	const senderNewBalance = senderData.balance - ammount;

	await User.findOneAndUpdate(
		{ userID: senderID },
		{
			balance: senderNewBalance,
		}
	);
	const receiverID = receiverData.userID;
	const receiverNewBalance = receiverData.balance + ammount;
	console.log(receiverData.balance, receiverNewBalance);

	await User.findOneAndUpdate(
		{ userID: receiverID },
		{
			balance: receiverNewBalance,
		}
	);

	//Registrar nueva transacción
	const transaction = new Transaction({
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
