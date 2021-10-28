const { Schema, model } = require("mongoose");

const User = Schema({
	userID: {
		type: String,
		unique: true,
	},
	username: {
		type: String,
		unique: true,
		required: [true, "Nombre Obligatorio"],
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatoria"],
	},
	role: {
		type: String,
		default: "USER",
	},
	balance: {
		type: Number,
	},
	status: {
		type: Boolean,
		default: true,
	},
});
User.methods.toJSON = function () {
	const { __v, password, ...usuario } = this.toObject();
	return usuario;
};

module.exports = model("usuarios", User);
