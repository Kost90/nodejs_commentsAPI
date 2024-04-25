const router = require("express")();
const userController = require("../controllers/usersController");

router.get("/:password/:email", userController.getUser);
router.post("/", userController.adduser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
