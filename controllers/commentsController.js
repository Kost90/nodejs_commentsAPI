const { Comments } = require("../db/models/Assosiations");

class Controller {
  constructor() {}

  async getComments(req, res) {
    const offset = req.offset;
    try {
      const result = await Comments.findAll({
        // Fetch included levels
        include: [
          {
            model: Comments,
            as: "Subcomment",
            limit: 25,
            offset: offset,
            order: [["createdAt", "DESC"]],
            include: [
              {
                model: Comments,
                as: "Subcomment",
                required: false,
                limit: 25,
                offset: offset,
                order: [["createdAt", "DESC"]],
                include: [
                  {
                    model: Comments,
                    as: "Subcomment",
                    required: false,
                    limit: 25,
                    offset: offset,
                    order: [["createdAt", "DESC"]],
                  },
                ],
              },
            ],
          },
        ],
        limit: 25,
        offset: offset,
        order: [["createdAt", "DESC"]],
        where: { parentID: null },
      });

      return res.json(result);
    } catch (error) {
      console.log("error is: ", error);
      return res.send("Can't fetch comments from DB");
    }
  }

  async addComment(req, res) {
    const comment = req.body;
    try {
      // Create parent comment if we didn't take from front side id of parent comment
      if (comment.parentID === undefined || comment.parentID === null) {
        const result = await Comments.create(comment);
        return res.json(result);
      } else {
        // Creating children comment from parent commet by parent comment ID wich we received from front side
        const parentComment = await Comments.findByPk(comment.parentID);

        if (!parentComment) {
          return res.status(404).send("Parent comment not found");
        }

        const newSubComment = await Comments.create(comment);
        await parentComment.addSubcomment(newSubComment);

        return res.json(newSubComment);
      }
    } catch (error) {
      console.log("error is: ", error);
      return res.send("Can't create new Comment");
    }
  }

  async deleteComment(req, res) {
    const id = req.params.id;
    try {
      const result = await Comments.destroy({ where: { commentID: id } });
      console.log(`Comment with commentID:${id} is deleted successfully!`);
      return res.json(result);
    } catch (error) {
      console.log("error is: ", error);
      return res.send("Can't delete comment");
    }
  }
}

const commentController = new Controller();

module.exports = commentController;
