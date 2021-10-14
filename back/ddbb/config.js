const mongoose = require("mongoose");

const connectDDBB = async () => {
	const dbURL = process.env.CNN_MONGOOSE;
	try {
		await mongoose.connect(dbURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("BBDD Online");
	} catch (error) {
		console.log(error);
		throw new Error("Error al conectar la ddbb");
	}
};

module.exports = { connectDDBB };
