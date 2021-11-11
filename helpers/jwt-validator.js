//imports
const jwt = require("jsonwebtoken");
//Schemas
const User = require("../ddbb/schemas/User");

/**
 * Verify if token is valid
 * @param {*} token
 */
const verifyJWT = async (token) => {
	jwt.verify(token, process.env.TOKEN_PRIVATE_KEY, (err, decoded) => {
		if (err) {
			throw new Error("Token no válido");
		}
	});
};

/**
 * Verify if the request have a valid token and if the user is "ADMIN_ROLE"
 * @param {*} token client´s token
 */
const isAdminToken = async (token) => {
	await jwt.verify(
		token,
		process.env.TOKEN_PRIVATE_KEY,
		async (err, token) => {
			if (err) {
				throw new Error("Token no válido");
			}
			const { uid: mongoUID } = token;
			const user = await User.findById(mongoUID);
			if (user.role !== "ADMIN_ROLE") {
				throw new Error(
					"El usuario no cuenta con los permisos necesarios para realizar esta consulta"
				);
			}
		}
	);
};

module.exports = {
	verifyJWT,
	isAdminToken,
};
