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
		//TODO: MEJORAR ESTO POR FAVOR xd
		const _skip = parseInt(totalDocs) - 6;
		transactions = await Transaction.find().skip(_skip);
		//Obtiene las transacciones de un usuario
		if (accountID) {
			const userTransactions = transactions.filter(
				(transaction) =>
					transaction.sender.uid === accountID ||
					transaction.receiver.uid === accountID
			);
			const reversedArr = userTransactions.reverse();
			return res.json({ totalDocs, reversedArr });
		}
		//Obtiene todas las transacciones de todos los usuarios.
		res.json({ totalDocs, userTransactions });
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
	const senderNewBalance = parseInt(senderData.balance) - parseInt(ammount);

	await User.findOneAndUpdate(
		{ userID: senderID },
		{
			balance: senderNewBalance,
		}
	);
	const receiverID = receiverData.userID;
	const receiverNewBalance =
		parseInt(receiverData.balance) + parseInt(ammount);

	await User.findOneAndUpdate(
		{ userID: receiverID },
		{
			balance: receiverNewBalance,
		}
	);

	//Registrar nueva transacción
	const transaction = new Transaction({
		transactionID: uuidv4().split("-")[4],
		sender: {
			uid: senderID,
			username: senderData.username,
		},
		receiver: { uid: receiverID, username: receiverData.username },
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
