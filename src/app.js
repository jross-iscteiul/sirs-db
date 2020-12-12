const express = require("express");
const routes = require("./routes");
const path = require("path");
//import "./database";
const db = require("./database");

class App {
  constructor() {
    this.server = express();
    this.middleWares();
    this.routes();
  }

  middleWares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
