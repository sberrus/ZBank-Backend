//Schemas
const User = require("../ddbb/schemas/User");
const Transaction = require("../ddbb/schemas/Transaction");
/**
 * @description Check if the user ID exist in the DB
 * @param {*} userID users unique ID
 */
const userExists = async (userID) => {
	const usuario = await User.findOne({ userID });
	if (!usuario) {
		throw new Error(`Error al encontrar al usuario - ID no existe en DDBB`);
	}
};

const transactionExists = async (transactionID) => {
	const transaction = await Transaction.findById(transactionID);
	if (!transaction) {
		throw new Error(
			"Error al consultar la transacción - ID no existe en DDBB"
		);
	}
};

module.exports = { userExists, transactionExists };
