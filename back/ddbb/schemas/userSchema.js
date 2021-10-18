const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	userID: {
		type: String,
		unique: true,
	},
	userName: {
		type: String,
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
});

module.exports = model("usuarios", UserSchema);
