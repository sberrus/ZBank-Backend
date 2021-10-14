const { Router } = require("express");
const { getUsers } = require("../controllers/users");
const router = Router();

router.get("/", getUsers);

module.exports = router;
