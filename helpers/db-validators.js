//Schemas
const User = require("../ddbb/schemas/User");

/**
 * @description Check if the user ID exist in the DB
 * @param {*} userID users unique ID
 */
const userExists = async (userID) => {
	const usuario = await User.findOne({ userID });
	if (!usuario) {
		throw new Error(`El usuario con ID: ${userID} no existe`);
	}
};
module.exports = { userExists };
