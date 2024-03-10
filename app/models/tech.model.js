module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        userName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });

    return User;
};
