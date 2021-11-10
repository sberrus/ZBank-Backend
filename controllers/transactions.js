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
	let transactions, totalDocs;

	try {
		totalDocs = await Transaction.countDocuments();
		//Obtiene una unica transacción
		if (transactionID) {
			const transaction = await Transaction.findById(transactionID);
			return res.json(transaction);
		}

		transactions = await Transaction.find();
		//Obtiene las transacciones de un usuario
		if (accountID) {
			const userTransactions = transactions.filter(
				(transaction) =>
					transaction.sender === accountID ||
					transaction.receiver === accountID
			);
			return res.json(userTransactions);
		}
		//Obtiene todas las transacciones de todos los usuarios.
		res.json({ totalDocs, transactions });
	} catch (error) {
		console.log(error);
	}
};

const newTransaction = async (req = request, res = response) => {
	let { sender, receiver, ammount } = req.body;
	let senderData, receiverData;

	try {
		//getting SENDER and RECEIVER from DDBB
		receiverData = await User.findOne({ userID: receiver });
		senderData = await User.findOne({ userID: sender });

		//check if SENDER has money
		if (senderData.balance < ammount) {
			return res.status(400).json({ error: "Estas pelando bolas" });
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error en el servidor", error });
	}

	const senderID = senderData.userID;
	const senderNewBalance = senderData.balance - parseInt(ammount);

	await User.findOneAndUpdate(
		{ userID: senderID },
		{
			balance: senderNewBalance,
		}
	);
	const receiverID = receiverData.userID;
	const receiverNewBalance = receiverData.balance + parseInt(ammount);

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
