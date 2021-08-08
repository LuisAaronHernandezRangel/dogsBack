const router = require("express").Router();
const adverController = require("../controllers/perroAdv.Controller.js");
const { auth } = require("../utils/middlewares");
//const { formData } = require("../utils/formData");

router.route("/").post(auth, 
    //formData, 
    adverController.create);
router.route("/").get(adverController.showAll);
router.route("/seeAd/:adverId").get(adverController.show);
router.route("/:adverId").put(adverController.update);
router.route("/:adverId").delete(auth, adverController.destroy);
router.route("/perroAd").get(auth,
     adverController.list);

module.exports = router;