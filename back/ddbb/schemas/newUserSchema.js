const { Schema, model } = require("mongoose");

const NewUserSchema = Schema({
	userID: {
		type: Boolean,
		default: true,
	},
	userName: {
		type: String,
		required: [true, "Nombre Obligatorio"],
	},
	password: {
		type: String,
		required: [true, "La contraseña es obligatoria"],
	},
	balance: {
		type: Number,
	},
});

module.exports = model("usuarios", NewUserSchema);
