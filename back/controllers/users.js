const { request, response } = require("express");
const { v4: uuidv4 } = require("uuid");
const newUserSchema = require("../ddbb/schemas/userSchema");

const usersDDBB = require("../helpers/users");

const getUsers = (req = request, res = response) => {
	//url querys
	const { userID } = req.query;

	//Obtiene las transacciones de un usuario
	if (userID) {
		const user = usersDDBB.filter(
			(user) => user.userID === parseInt(userID)
		);
		if (!user[0]) {
			return res
				.status(400)
				.json({ msg: "No existe usuario con ID: " + userID });
		}
		return res.json(user[0]);
	}

	res.json(usersDDBB);
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
