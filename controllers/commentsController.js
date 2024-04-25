const { Comments } = require("../db/models/Assosiations");

class Controller {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async getComments(req, res) {
    const page = req.params.page;
    const offset = (page - 1) * 25 || 0;
    try {
      const result = await Comments.findAll({
        // TODO: How to make include dinamyc and show all levels of subcommets in subcomments that it have?
        include: [
          {
            model: Comments,
            as: "Subcomment",
            include: [
              {
                model: Comments,
                as: "Subcomment",
                required: false,
                include: [
                  {
                    model: Comments,
                    as: "Subcomment",
                    required: false,
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
      const result = await Comments.create(comment);
      return res.json(result);
    } catch (error) {
      console.log("error is: ", error);
      return res.send("Can't create new Comment");
    }
  }

  async addSubComment(req, res) {
    const subCommentData = req.body;
    try {
      const parentComment = await Comments.findByPk(subCommentData.parentID);

      if (!parentComment) {
        return res.status(404).send("Parent comment not found");
      }

      const newSubComment = await Comments.create(subCommentData);
      await parentComment.addSubcomment(newSubComment);

      return res.json(newSubComment);
    } catch (error) {
      console.log("Error adding sub-comment: ", error);
      return res.status(500).send("Error adding sub-comment");
    }
  }
}

const commentController = new Controller();

module.exports = commentController;
