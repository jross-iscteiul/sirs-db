const express = require("express");

const Router = express.Router;

const authMiddleware = require("./app/middlewares/auth");

const UserController = require("./app/controllers/UserController");
const SessionController = require("./app/controllers/SessionController");
const TrackerController = require("./app/controllers/TrackerController");
const TokenController = require("./app/controllers/TokenController");

const routes = new Router();

routes.get("/", (req, res) => res.json("hello world"));

//routes.get("/users", UserController.index);

routes.get("/confirmEmail/:token", UserController.confirmEmail);
routes.post("/auth/register", UserController.store);

routes.post("/auth/login", SessionController.store);

routes.get("/api/trackers", TrackerController.index);
routes.post("/api/trackers", TrackerController.store);

routes.post("/token", TokenController.store);

/*
routes.use(authMiddleware);
routes.post("/Trackers"); */

module.exports = routes;
