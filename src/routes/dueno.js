const router = require("express").Router();
const duenoController = require("../controllers/dueno.controller");
const { auth } = require("../utils/middlewares");
const { formData } = require("../utils/formData");

router.route("/").get(duenoController.list);
router.route("/signin").post(duenoController.signin);
router.route("/signup").post(duenoController.signup);
router.route("/profile").get(auth, duenoController.show);
router.route("/:userhId").get(duenoController.show);
router.route("/profile").put(auth, formData, duenoController.update);
// router.route("/:userhId").delete(userHostController.destroy);

module.exports = router;