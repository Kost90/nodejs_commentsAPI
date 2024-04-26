const Comments = require("./Comments");
// const SubComments = require("./SubComments");

Comments.hasMany(Comments,{
  foreignKey:"parentID",
  as:"Subcomment",onDelete:"CASCADE"
});
Comments.belongsTo(Comments,{
  foreignKey:"parentID",
  as:"ParentComment",
})

module.exports = {
  Comments,
  // SubComments,
};
