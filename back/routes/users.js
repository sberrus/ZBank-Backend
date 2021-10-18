const { Router } = require("express");
const { getUsers, newUser } = require("../controllers/users");
const UserModel = require("../ddbb/schemas/userSchema");
const router = Router();

router.get("/", getUsers);
router.post("/", newUser);
//testing
router.get("/pruebas", async (req, res) => {
	const user = await UserModel.findOne({ userID: "40cb" });

	res.status(200).json(user);
});

module.exports = router;
