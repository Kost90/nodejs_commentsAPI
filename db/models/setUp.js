const { SubComments, Comments} = require("./Assosiations");

async function CreateTables() {
  try {
    await Comments.sync({ force: true });
    // await SubComments.sync({ force: true });
    console.log("Tables created successful!");
  } catch (error) {
    console.error("Can't create a tables!",error);
  }
}

module.exports = CreateTables;
