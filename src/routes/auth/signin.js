"use strict";

const { response } = require("express");
const auth = require("../../data/auth");
const User = require ("../../model/User");

module.exports.register = async server => {

    server.route( {
        method: "POST",
        path: "/auth/register",
        handler: async request =>{
            try{
                const {username,password,email,public_key} = request.payload;

                const db = request.server.plugins.sql.client;
                
                if(db.auth){
                console.log("db: is real register");}
                else {
                    console.log("db:not true register")
                }
                console.log(request.payload);

               
                // decrypt previously encrypted pw by user with server public key
                //encrypt with 
                const res = await db.auth.signUp(username,password,email,public_key);
                console.log("ROWS AFFECTED: "+ res.rowsAffected );
                var data = {"rowsAffected" : res.rowsAffected, "confirm": "you did gud"};
                console.log(data);
                return data;
            }catch(err) {
                console.log( err );
            }
        }
    });
    
    server.route( {
        method: "POST",
        path: "/auth/login",
        handler: async (request,reply) =>{
            try{
                const db = request.server.plugins.sql.client;
                
                if(db.auth){
                console.log("db: is real my trackers");}
                else {
                    console.log("db:not true my trackeers")
                }
                
                //const res = await db.auth.signOn();
                /**if(res.rowsAffected>=0);
                console.log("Login:"+res.rowsAffected);**/
            }
                catch(err) {
                console.log( err );
            }
            console.log("cona")
            const data = {id:2123,cona:'cona'}
            return reply.response(data).code(202)
        }
    });
    }