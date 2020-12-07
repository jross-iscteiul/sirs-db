"use strict";

const auth = require("./auth");
const api = require("./api");

module.exports.register = async server =>{

    await api.register(server);
    await auth.register(server);
    console.log("register done")

    server.route({
        method : "GET",
        path: "/",
        handler: async (request, h) =>{
            return "My first hapi server!";
        }
    });
}