const router = require("express")();
const commentController = require("../controllers/commentsController");

router.get("/:page", commentController.getComments);
router.post("/", commentController.addComment);
router.post("/subcomments", commentController.addSubComment);
// router.delete('/:id',"Controller");

module.exports = router;
