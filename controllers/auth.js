//Imports
const { response } = require("express");
const bcryptjs = require("bcryptjs");
//Schemas
const User = require("../ddbb/schemas/User");
const { generarJWT } = require("../helpers/jwt-generator");

const login = async (req = request, res = response) => {
	const { username, password } = req.body;

	try {
		//Vaidaciones
		//existe correo
		const usuario = await User.findOne({ nombre: username });
		console.log(usuario);
		if (!usuario) {
			return res
				.status(400)
				.json({ msg: "Error al iniciar sesión - Correo" });
		}
		//usuario activo
		if (usuario.estado === false) {
			return res
				.status(400)
				.json({ msg: "Error al iniciar sesión - Estado" });
		}
		//contraseña
		const validPassword = bcryptjs.compareSync(password, usuario.password);
		if (!validPassword) {
			return res
				.status(400)
				.json({ msg: "Error al iniciar sesión - Password" });
		}
		//generar JWT
		const token = await generarJWT(usuario.id);

		res.json({
			usuario,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Error en el servidor",
		});
	}
};

module.exports = { login };
