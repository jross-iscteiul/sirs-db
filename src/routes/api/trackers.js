"use strict";

const trackers = require("../../data/trackers");

//const api = require("../api");


module.exports.register = async server => {

  //  await api.register(server);

    server.route( {
        method: "GET",
        path: "/api/trackers",
        handler: async request =>{
            try{
                const db = request.server.plugins.sql.client;
                
                const userId = "user1234";
                if(db.trackers){
                console.log("db: is real ");}
                else {
                    console.log("db:not true")
                }
                
                const res = await db.trackers.getTrackers();
                console.log(res.recordset);
                return res.recordset;
            }catch(err) {
                console.log( err );
            }
        }
    });
    server.route( {
        method: "GET",
        path: "/api/mytrackers",
        handler: async request =>{
            try{
                const db = request.server.plugins.sql.client;
                
                const userId = "user1234";
                if(db.trackers){
                console.log("db: is real my trackers");}
                else {
                    console.log("db:not true my trackeers")
                }
                
                const res = await db.trackers.getMyTrackers();
                console.log(res.recordset);
                return res.recordset;
            }catch(err) {
                console.log( err );
            }
        }
    });
    
}