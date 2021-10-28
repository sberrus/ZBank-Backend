//imports
const { request, response } = require("express");
//helpers
const { v4: uuidv4 } = require("uuid");
//Schemas
const User = require("../ddbb/schemas/User.js");

const getUsers = async (req = request, res = response) => {
	const { userID } = req.query; //querys

	try {
		//Get one user
		if (userID) {
			const user = await User.findOne({ userID });
			return res.json(user);
		}
		//Get all users
		const users = await User.find();
		const usersCount = await User.countDocuments();
		res.status(200).json({ usersCount, users });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: "Error en el server", error });
	}
};

const newUser = async (req = request, res = response) => {
	const { username, password } = req.body;

	const userID = uuidv4().split("-")[2];
	const balance = 2500;

	const user = new User({
		userID,
		username,
		password,
		balance,
	});

	try {
		await user.save();
		res.status(201).json({ user });
	} catch (error) {
		console.log(error);
		res.status(400).json({
			msg: "error al guardar en la bbdd",
			error,
		});
	}
};

module.exports = { getUsers, newUser };
