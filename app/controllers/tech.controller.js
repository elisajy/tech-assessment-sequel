const db = require("../models");
const Tech = db.tech;
const Op = db.Sequelize.Op;

// create and save data
exports.create = (req, res) => {
    // data validation required
    if (!req.body.userName) {
        res.status(400).send({
            message: "Username can not be empty!"
        });
        return;
    }

    // create user
    const user = {
        userName: req.body.userName,
        email: req.body.email,
    };

    // save user
    Tech.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Failed to create user."
            });
        });
};

// retrieve all users from the db
exports.findAll = (req, res) => {
    const userName = req.query.userName;
    var condition = userName ? { userName: { [Op.iLike]: `%${userName}%` } } : null;

    Tech.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Failed to retrieve users."
            });
        });
};

// find single user
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tech.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find user with id:${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retrieving user with id:" + id
            });
        });
};

// update user by id
exports.update = (req, res) => {
    const id = req.params.id;

    Tech.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Successfully updated user."
                });
            } else {
                res.send({
                    message: `Unable update user with id:${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error updating user with id:" + id
            });
        });
};

// delete user by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Tech.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Successfully deleted user."
                });
            } else {
                res.send({
                    message: `Unable to delete user with id:${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error deleting user with id:" + id
            });
        });
};
