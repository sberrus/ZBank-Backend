const mongoose = require("mongoose");

const connectDDBB = async () => {
	const dbURL = process.env.CNN_MONGO;
	console.log(dbURL);
	try {
		await mongoose.connect(dbURL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("BBDD Online");
	} catch (error) {
		console.log(error);
	}
};

module.exports = { connectDDBB };
