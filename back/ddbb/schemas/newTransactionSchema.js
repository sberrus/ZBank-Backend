const { Schema, model } = require("mongoose");

const NewTransactionSchema = Schema({
	transactionID: {
		type: String,
		unique: true,
	},
	sender: {
		type: String,
		required: [true, "El ID de la cuenta emisora es obligatoria"],
	},
	receiver: {
		type: String,
		required: [true, "El ID de la cuenta receptora es obligatoria"],
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

module.exports = model("transactions", NewTransactionSchema);
