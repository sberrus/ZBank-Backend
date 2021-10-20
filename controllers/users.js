const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");
const newUserSchema = require("../ddbb/schemas/userSchema");

const getUsers = async (req = request, res = response) => {
	//url querys
	const { userID } = req.query;

	//Obtiene las transacciones de un usuario
	try {
		const users = await newUserSchema.find();
		if (userID) {
			const uniqueUser = users.filter((user) => user.userID === userID);
			//en caso de que no encuentre usuario
			/* if (user === null) {
				return res.status(400).json({ error: "Usuario no existe" });
			} */
			return res.json(uniqueUser[0]);
		}
		res.json(users);
	} catch (error) {
		console.log(error);
		return res.status(500).json(user);
	}
};

const newUser = async (req = request, res = response) => {
	const { userName, password } = req.body;

	const userID = uuidv4().split("-")[2];
	const balance = 2500;

	const newUsuario = new newUserSchema({
		userID,
		userName,
		password,
		balance,
	});

	try {
		await newUsuario.save();
		res.status(201).json({ newUsuario });
	} catch (error) {
		console.log(error.error);
		res.status(400).json({
			errMsg: "error al guardar en la bbdd",
			error,
		});
	}
};

module.exports = { getUsers, newUser };
