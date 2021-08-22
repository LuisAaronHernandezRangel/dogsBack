const router = require("express").Router();
const adverController = require("../controllers/perroAdv.Controller.js");
const { auth } = require("../utils/middlewares");
const { formData } = require("../utils/formData");

router.route("/").post(auth,formData, adverController.create);
router.route("/").get(adverController.showAll);
router.route("/perroAd").get(auth,adverController.list);
router.route("/seeAd/:adverId").get(adverController.show);
router.route("/todos").get(adverController.listAll);
router.route("/:adverId").put(auth,adverController.update);
router.route("/:adverId").delete(auth, adverController.destroy);


module.exports = router;