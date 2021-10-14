const { request, response } = require("express");
const usersDDBB = require("../helpers/users");

const allUsers = (req = request, res = response) => {
	//url querys
	const { userID } = req.query;

	//Obtiene las transacciones de un usuario
	if (userID) {
		return res.json({ userID });
	}

	res.json(usersDDBB);
};

const getUser = (req = request, res = response) => {
	const { id } = req.query;
	console.log("Usuario" + id);
};

module.exports = { allUsers, getUser };
