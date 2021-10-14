const { Router } = require("express");
const { allUsers } = require("../controllers/users");
const router = Router();

router.get("/", allUsers);

module.exports = router;
