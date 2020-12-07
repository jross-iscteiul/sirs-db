"use strict"

const sql = require("mssql");
const auth  = require("./auth");
const trackers = require("./trackers");

const client = async (server, config) => {
    let pool = null;

    const closePool = async () => {
        try{
            await pool.close();
            pool =null;
            
        }catch (err) {
            pool = null;
            console.log (err);
        }
    };

    const getConnection = async () => {
        try{
            if(pool) {
                return pool;
            }
            pool = await sql.connect ( config);
            console.log("pool:"+pool);
            pool.on("error", async err => {
                console.log(err);
                await closePool();
            });
            return pool;
        }
     catch (err) {
        console.log(err);
        pool = null;
    }};

    return{
     trackers: await trackers.register( {sql,getConnection}),
     auth: await auth.register({sql,getConnection})
    //mytrackers: await trackers.register({sql,getConnection})
     
    };   
}

module.exports = client;
