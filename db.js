const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog_app', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});


const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log("DB CONNECTED SUCCESSFULLY!!");
    }
    catch (e) {
        console.log("DB CONNECTION FAILED");
        console.log(e);
    }
}

module.exports = connectDB;
global.sequelize = sequelize;


