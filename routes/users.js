//imports
const { Router } = require("express");
const { body, query } = require("express-validator");
//Schemas
const User = require("../ddbb/schemas/User");
//controllers
const { getUsers, newUser } = require("../controllers/users");
//helpers
const { errorHandler } = require("../middlewares/EVErrorHandler");
const { userExists } = require("../helpers/db-validators");

//router
const router = Router();

router.get(
	"/",
	[query("userID").optional().custom(userExists), errorHandler],
	getUsers
);
router.post(
	"/",
	[
		body("userName")
			.notEmpty()
			.withMessage("El campo userName es obligatorio"),
		body("password")
			.notEmpty()
			.withMessage("El campo password es obligatorio"),
	],
	errorHandler,
	newUser
);

//testing
router.get("/pruebas", async (req, res) => {
	const { userID, balance } = req.body;
	try {
		await User.findOneAndUpdate(userID, { balance });

		res.status(200).json({ done: "true" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "jeje" });
	}
});

module.exports = router;
