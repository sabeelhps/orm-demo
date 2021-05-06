const { Sequelize, DataTypes } = require('sequelize');


const Blog = sequelize.define('Blog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING
    }
});

Blog.sync()
    .then(() => {
        console.log("Table Created");
    })
    .catch((err) => {
        console.log("Table Not Created");
    })
  
module.exports = Blog;
  