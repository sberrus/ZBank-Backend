//imports
const { Router } = require("express");
const { body } = require("express-validator");

//controllers
const { getUsers, newUser } = require("../controllers/users");
const UserModel = require("../ddbb/schemas/userSchema");

//helpers
const { errorHandler } = require("../middlewares/EVErrorHandler");

//router
const router = Router();

router.get("/", getUsers);
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
	const userID = req.body.sender;
	const user = await UserModel.findOne({ userID });

	res.status(200).json(user);
});

module.exports = router;
