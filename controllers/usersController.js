const { User, Comments } = require("../db/models/Assosiations");
const bcrypt = require("bcrypt");

class Controller {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async adduser(req, res) {
    let newUser = req.body;
    const { password } = newUser;
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    try {
      const result = await User.create(newUser);
      return res.json(result);
    } catch (error) {
      // TODO:Make colors for error
      console.log("error is: ", error);
      return res.send("Can't create new User");
    }
  }

  async getUser(req, res) {
    const userEmail = req.params.email;
    const userPassword = req.params.password;
    try {
      const result = await User.findOne({
        where: { email: userEmail },
        include: { model: Comments, as: "comments" },
      });
      const isMatch = await bcrypt.compare(userPassword, result.password);
      if (result && isMatch !== null) {
        return res.json(result);
      }
    } catch (error) {
      // TODO:Make colors for error
      console.log("error is: ", error);
      return res.send("User not found");
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      const result = await User.destroy({ where: { userID: id } });
      console.log(`User with userID:${id} is deleted successfully!`);
      return res.json(result);
    } catch (error) {
      console.log("error is: ", error);
      return res.send("Can't delete user");
    }
  }
}

const userController = new Controller();

module.exports = userController;
