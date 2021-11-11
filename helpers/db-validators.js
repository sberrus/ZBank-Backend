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
/**
 *
 * @param {*} username check if username exists in DB and if its status is true
 */
const userIsActive = async (username) => {
	const usuario = await User.findOne({ username });
	if (!usuario) {
		throw new Error(`Error al encontrar al usuario - ID no existe en DDBB`);
	}
	if (usuario.status === false) {
		throw new Error(`Error al encontrar al usuario - Usuario dado de baja`);
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
const usernameIsUnique = async (username) => {
	const user = await User.findOne({ username });
	if (user) {
		throw new Error("El nombre de usuario ya existe");
	}
};

/**
 * Check if the user in the request is "ADMIN_ROLE" BY its token.
 * @param {*} userID user´s uid
 */
const isAdmin = async (userID) => {
	const user = await User.findOne({ userID });
	if (!(user.role === "ADMIN_ROLE")) {
		throw new Error(
			"El no cuenta con los permisos necesarios para realizar esta acción"
		);
	}
};

module.exports = {
	userExists,
	transactionExists,
	usernameIsUnique,
	userIsActive,
	isAdmin,
};
