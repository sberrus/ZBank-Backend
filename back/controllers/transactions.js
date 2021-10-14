//imports
const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");

//helpers
const data = require("../helpers/transactions");

//Get all transactions if you dont send the query id. If you send the query "id" you will get the info of that transaction
const getTransactions = (req = request, res = response) => {
	const { id } = req.query;
	if (id) {
		return res.json({ id });
	}
	res.json(data);
};

const newTransaction = (req = request, res = response) => {
	let body = req.body;
	console.log(body);

	res.send("as");

	/* res.json({
		_transactionID: uuidv4(),
		from: sender,
		to: receiver,
		ammount,
		date: new Date().toUTCString(),
	}); */
};

module.exports = {
	getTransactions,
	newTransaction,
};
