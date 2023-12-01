'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
  
    static associate({ User, Capsule }) {
      Comment.belongsTo(Capsule, { as: 'capsule', foreignKey: 'capsule_id' })
      Comment.belongsTo(User, { as: 'author', foreignKey: 'author_id' })
    }

  };
  Comment.init({
    commentId: {
      type:  DataTypes.SMALLINT,
      primaryKey: true,
      autoIncrement: true
    },
    capsuleId: DataTypes.SMALLINT,
    authorId: DataTypes.SMALLINT,
    content: DataTypes.STRING,
    stars: DataTypes.FLOAT,
    rant: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored: true,
    modelName: 'Comment',
  });
  return Comment;

};