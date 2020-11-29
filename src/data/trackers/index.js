"use strict";

const utils = require("../utils");
var format = require('pg-format');

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
        list = list.replace(/["]/g,"");
let stmt = "INSERT INTO [dbo].[Trackers] ([trackerkey],[location],[date]) VALUES %L ";
        
	list = [['ola','amigos','ambiente'],["adeus","amigos","ambiente"]];
        console.log(list);
        request.input("list",list)
	console.log(format(stmt,list));       	
	//request.query(format(stmt,list));


return await request.query(format(stmt,list))/**, (err, results, fields) => {
/**  if (err) {
    return console.error(err.message);
  }
  // get inserted rows
  console.log('Row inserted:' + results.affectedRows);
});**/
    }

    return { 
        getTrackers,
        getMyTrackers,
        addMyTrackers
    };



}

module.exports = {register};
