const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			process.env.TOKEN_PRIVATE_KEY,

			//callback
			(err, token) => {
				if (err) {
					console.log(err);
					reject("No se pudo generar el token");
				} else {
					//devolvemos la promesa con el token resuelto
					resolve(token);
				}
			}
		);
	});
};
module.exports = { generarJWT };
