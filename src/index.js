"use strict";

const config = require("./config");
const server = require("./server");


const startServer = async () => {
    try{
       
        const app = await server(config);
        await app.start();

        console.log(`Server running in port ${config.port}`);
        
    
    }
    catch(err){
       console.log(err) ;
    }
};

startServer();