const express = require("express");
const cors = require("cors");
const { connectDDBB } = require("../ddbb/config");

class Server {
	constructor() {
		this.app = express();
		this._port = process.env.PORT;
		this._transactionsPath = "/v1/transactions";
		this._usersPath = "/v1/users";

		//connect ddbb
		this.DDBB();

		//use Middlewares SIEMPRE DECLARAR LOS MIDDLEWARES ANTES QUE LAS RUTAS :)
		this.middlewares();

		//use Routes
		this.routes();
	}

	middlewares() {
		//json encoder
		this.app.use(express.json());
		//cors config
		this.app.use(cors());
	}
	async DDBB() {
		await connectDDBB();
	}

	routes() {
		this.app.use(this._transactionsPath, require("../routes/transactions"));
		this.app.use(this._usersPath, require("../routes/users"));
	}

	run() {
		this.app.listen(this._port, () => {
			console.log("Server corriendo en el puerto", this._port);
		});
	}
}

module.exports = Server;
