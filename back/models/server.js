const express = require("express");
const cors = require("cors");

class Server {
	constructor() {
		this.app = express();
		this._port = process.env.PORT;
		this._transactionsPath = "/v1/transactions";

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

	routes() {
		this.app.use(this._transactionsPath, require("../routes/transactions"));
		this.app.post(this._transactionsPath, (req, res) => {
			let body = req.body;
			console.log(body);
			res.json(body);
		});
	}

	run() {
		this.app.listen(this._port, () => {
			console.log("Server corriendo en el puerto", this._port);
		});
	}
}

module.exports = Server;
