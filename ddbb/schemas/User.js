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
		default: "USER_ROLE",
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
	const { __v, password, _id, ...usuario } = this.toObject();
	usuario.uid = _id;
	return usuario;
};

module.exports = model("usuarios", User);
