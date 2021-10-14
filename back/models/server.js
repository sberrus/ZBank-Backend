const express = require("express");

class Server {
	constructor() {
		this.app = express();
		this._port = process.env.PORT;
		this._transactionsPath = "/v1/transactions";

		//use Routes
		this.routes();

		//use Middlewares
		this.middlewares();
	}

	middlewares() {
		this.app.use(express.json());
	}

	routes() {
		this.app.use(this._transactionsPath, require("../routes/transactions"));
	}

	run() {
		this.app.listen(this._port, () => {
			console.log("Server corriendo en el puerto", this._port);
		});
	}
}

module.exports = Server;
