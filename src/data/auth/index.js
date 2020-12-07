


const utils = require("../utils");
var format = require('pg-format');
const { RequestError } = require("mssql");


const register = async ( {sql,getConnection}) => {
    const cnx = await getConnection();
    const request = await cnx.request();

    const signUp = async (username, password, email, public_key) => {


    let stmt = "INSERT INTO [tracker-db].[dbo].[Clients] ([username],[password],[email],[public_key]) VALUES( '%s','%s','%s','%s')";

    console.log(format(stmt,username,password,email,public_key))
    
    res= await request.query(format(stmt,username,password,email,public_key),async (error,results) => {
        if (error instanceof RequestError){
            console.log("RequestError : Erro inserting into db, check your parameters");
        }
        else{
            console.log("good job")
            return res;
        }})
        
        return null;}
        
    

    const signOn = async (email, password) => {
        const cnx = await getConnection();
        const request = await cnx.request();
    }
return {signUp,
        signOn};

}

module.exports = {register};
