module.exports = app => {
    const tech = require("../controllers/tech.controller.js");

    var router = require("express").Router();

    // create new user
    router.post("/", tech.create);

    // retrieve all user
    router.get("/all", tech.findAll);

    // retrieve user by id
    router.get("/:id", tech.findOne);

    // update user by id
    router.put("/:id", tech.update);

    // delete user by id
    router.delete("/:id", tech.delete);

    app.use("/api/tech", router);
};
