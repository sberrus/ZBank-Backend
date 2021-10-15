const { Router } = require("express");
const { getUsers, newUser } = require("../controllers/users");
const NewUserSchema = require("../ddbb/schemas/newUserSchema");
const router = Router();

router.get("/", getUsers);
router.post("/", newUser);

module.exports = router;
