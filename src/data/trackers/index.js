"use strict";

const utils = require("../utils");

const register = async ( {sql,getConnection}) => {
    const sqlQueries = await utils.loadSqlQueries( "trackers");

    const getTrackers = async () => {
        const cnx = await getConnection();
        const request = await cnx.request();
        return await request.query(sqlQueries.getTrackers);
    };

    const getMyTrackers = async () => {
        console.log("GET MY TRAQUERS REQUREST")

        const cnx = await getConnection();
        const request = await cnx.request();
        return await request.query(sqlQueries.getMyTrackers);

    };

    return { 
        getTrackers,
        getMyTrackers
    };



}

module.exports = {register};