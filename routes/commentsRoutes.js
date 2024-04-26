const router = require("express")();
const commentController = require("../controllers/commentsController");
const commentsMidleware = require("../midleware/paginationMidleware");
const uploadImage = require("../midleware/multerMidleware");
const resizeImage = require("../midleware/resizeImageMidleware");

router.get(
  "/:page",
  commentsMidleware.isPagination,
  commentController.getComments
);
router.post(
  "/",
  uploadImage.single("file"),
  resizeImage,
  commentController.addComment
);
router.delete("/:id", commentController.deleteComment);

module.exports = router;
