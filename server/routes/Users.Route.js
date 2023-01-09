const router = require("express").Router();
const loginRequired = require("../middleware/loginRequired");
const AuthPermissions = require("../middleware/Auth.Permission");
const UsersController = require("../controllers/Users.Controller");

router.post("/all", loginRequired, AuthPermissions("admin"), UsersController.all);

module.exports = router;
