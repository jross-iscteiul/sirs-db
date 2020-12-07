"use strict";

const Hapi = require("@hapi/hapi");
const plugins = require("./plugins");
const routes = require("./routes");

const app = async config =>{
    const{host,port} = config;

    const server = Hapi.server({host,port});

    server.app.config = config;


    console.log("Servidor: "+ server)
    await plugins.register( server );
    await routes.register( server );
    
     
    
    return server;
};
module.exports = app;