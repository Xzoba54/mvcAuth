const router = require("express").Router();
const loginRequired = require("../middleware/loginRequired");

const PagesController = require("../controllers/Pages.Controller");

router.post("/home", loginRequired, PagesController.home);

module.exports = router;
