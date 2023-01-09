const router = require("express").Router();

const { registerValidation, loginValidation } = require("../middleware/Auth.Validation");
const loginRequired = require("../middleware/loginRequired");
const AuthController = require("../controllers/Auth.Controller");

router.post("/register", registerValidation, AuthController.register);
router.post("/login", loginValidation, AuthController.login);
router.post("/verify", loginRequired, AuthController.verify);
router.post("/refresh", AuthController.refresh);
router.delete("/delete", loginRequired, AuthController.delete);
router.post("/logout", loginRequired, AuthController.logout);

module.exports = router;

//PRZEMEK DZBANIE JEBANY CZYTAJ TO***************************************
//OBECNIE PRACUJESZ NAD PLIKIEM PROTECTEDROUTES
//ZAUTOMATYZUJ SPRAWDZANIE ORAZ REFRESHOWANIE TOKENOW
//POPRAW PLIK HOME.JSX ZEBY NIE WYPIERDALALO DO /LOGIN
//SPECJALNE AUTH DLA /LOGIN
//SPRAWDZA CZY LOCALSTORAGE ISTNIEJE ORAZ WERYFIKUJE ACCESSTOKEN
//JESLI DOBRY - PRZEJDZ DO /
//JESLI ZLY - WYPIERDOL LOCALSTORAGE I WYSWIEL FORMULARZ
//TO SAMO DLA CREATEACCOUNT

//COS ZJEBALES Z ASYNC AWAIT W PROTECTEDROUTES - NIE ZJEBALES TYLKO NIE TEN URL ZJEBIE
