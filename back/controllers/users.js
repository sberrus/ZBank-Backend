const { request, response } = require("express");
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

module.exports = { getUsers };
