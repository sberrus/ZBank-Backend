const { Schema, model } = require("mongoose");

const Transaction = Schema({
	transactionID: {
		type: String,
		unique: true,
	},
	sender: {
		uid: {
			type: String,
			required: [true, "El ID de la cuenta emisora es obligatoria"],
		},
		username: {
			type: String,
			required: [true, "El username de la cuenta emisora es obligatorio"],
		},
	},
	receiver: {
		uid: {
			type: String,
			required: [true, "El ID de la cuenta receptora es obligatorio"],
		},
		username: {
			type: String,
			required: [
				true,
				"El username de la cuenta receptora es obligatorio",
			],
		},
	},
	date: {
		type: Date,
		required: [true, "La fecha es obligatoria"],
	},
	ammount: {
		type: Number,
		required: [true, "El monto es obligatorio"],
	},
});

module.exports = model("transactions", Transaction);
