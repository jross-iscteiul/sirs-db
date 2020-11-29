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

        const cnx = await getConnection();
        const request = await cnx.request();
        return await request.query(sqlQueries.getMyTrackers);

    };

    const addMyTrackers = async (list) => {
        const cnx = await getConnection();
        const request = await cnx.request();
        return await request.query(sqlQueries.addTrackers(list));
    }

    return { 
        getTrackers,
        getMyTrackers,
        addMyTrackers
    };



}

module.exports = {register};