const { Router } = require("express");
const { getUsers, newUser } = require("../controllers/users");
const router = Router();

router.get("/", getUsers);
router.post("/", newUser);

module.exports = router;
