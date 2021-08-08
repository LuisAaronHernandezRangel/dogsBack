const router = require("express").Router();
const heroeController = require("../controllers/heroe.controller");
const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/signup").post(heroeController.signup);
router.route("/signin").post(heroeController.signin);
router.route("/profile").put(auth, heroeController.update);
router.route("/updatePhoto").put(auth,
    //formData, 
    heroeController.photoProfile);
router.route("/profile").get(//auth, 
    heroeController.show);

router.route("/:userhId").delete(auth, heroeController.destroy);

router.route("/").get(heroeController.list);

module.exports = router;