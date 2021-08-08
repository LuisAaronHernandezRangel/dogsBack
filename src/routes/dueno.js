const router = require("express").Router();
const duenoController = require("../controllers/dueno.controller");
const { auth } = require("../utils/middlewares");
// const { formData } = require("../utils/formData");

router.route("/").get(duenoController.list);
router.route("/signin").post(duenoController.signin);
router.route("/signup").post(duenoController.signup);
router.route("/profile/:userId").get(//auth,
     duenoController.show);
router.route("/:userId").get(duenoController.show);
router.route("/profile/:userId").put(auth,
      //formData,
     duenoController.update);
router.route("/profile/updatePhoto/:userId").put(auth, 
          //formData,
          duenoController.updatePhoto);
router.route("/:userhId").delete(auth, duenoController.destroy);

module.exports = router;