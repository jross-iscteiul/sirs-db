"use strict"
 
const fs = require("fs-extra");
const { join } = require("path");

const loadSqlQueries = async folderName => {
    const filePath = join(process.cwd(), "src", "data", "trackers");
    console.log("filepath: "+filePath);
    const files = await fs.readdir( filePath);
    console.log("files: "+files);
    const sqlFiles = files.filter( f => f.endsWith(".sql"));
    const queries = {};
    for( const sqlFile of sqlFiles  ){
        const query = fs.readFileSync( join( filePath, sqlFile), { encoding:"UTF-8"});
        console.log("query:" + query);
        console.log(sqlFile.replace(".sql", ""));
        queries[sqlFile.replace(".sql", "")]= query;
    }
    return queries;

};

module.exports = {
    loadSqlQueries
};