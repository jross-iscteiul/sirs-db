"use strict";

const { response } = require("express");
const jwt = require("jsonwebtoken");
const env = require ('../../config');
const fs = require('fs');


module.exports.register = async server => {


    var privateKey = fs.readFileSync('./././rsa_private_key.txt','utf8');
    var publicKey = fs.readFileSync('./././rsa_public_key.txt','utf8');

    function CheckPassword(inputtxt)
    { 
        var passRules = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])^[A-Za-z0-9 ]+$/;
        if(passRules.test(inputtxt)) 
        {           
            return true;
        }
        else
        {       
            return false;
        }
    } 
    function CheckPhoneN(inputtxt)
    { 
        console.log(inputtxt);
        var passRules = /^[0-9]+${,9}/;
        if(passRules.test(inputtxt)) 
        { 
            console.log("certo");
            return true;
        }
        else
        { 
            console.log("não certo");
            return false;
        }
    } 


    server.route( {
        method: "POST",
        path: "/auth/register",
        handler: async request =>{
            try{
                const {username,password,email} = request.payload;

                
            if(CheckPassword(password)){
                console.log("True");            

                const db = request.server.plugins.sql.client;
                
                if(db.auth){
                console.log("db: is real register");}
                else {
                    console.log("db:not true register")
                }
                console.log(request.payload);
                var verified = 0
                const res = await db.auth.signUp(username,password,email,verified);
               /* // decrypt previously encrypted pw by user with server public key
                //encrypt with 
               
               
                console.log("ROWS AFFECTED: "+ res.rowsAffected );
                var data = {"rowsAffected" : res.rowsAffected, "confirm": "you did gud"};
                console.log(data);
                return data;*/
                return res;
            }else{
                console.log("Palavra pass incorecta");
                return null;
            }
            }catch(err) {
                console.log( err );
            }   
        }
    });

    server.route({
        method:"GET",
        //token:{token},
        path:'/confirmation/{token}',        
        handler: async (request,response) =>{
 
        const db = request.server.plugins.sql.client;
        try {          
            const email=jwt.verify(request.params.token,env.email.secret);
            console.log(email.username);
            const mail=email.username;
            const res = await db.auth.authentication(mail);
           
       //     await User.update({comfirmed:true},{where:{id}});
        } catch (error) {
          console.log(error);  
        }
        return response.redirect('http://localhost:8080/auth/login');
    }
    });

    
    server.route( {
        method: "POST",
        path: "/auth/login",
        handler: async (request,reply) =>{
            try{
             const {email,password} = request.payload;  
             const db = request.server.plugins.sql.client;
            
            if(1==1){//mudar para phone 
            }
            console.log(email);
            console.log(password);
                if(CheckPassword(password)){
                    console.log("password checked sucessfully")
                    const res= await db.auth.signOn(email,password);
                }
              
            /*    if(db.auth){
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