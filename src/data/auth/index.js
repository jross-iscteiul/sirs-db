


const utils = require("../utils");
var format = require('pg-format');
const { RequestError } = require("mssql");
const nodemailer = require ('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require ("../../config");
const e = require("express");


const register = async ( {sql,getConnection}) => {
    const cnx = await getConnection();
    const request = await cnx.request();

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: env.email.user,
            pass: env.email.pass
        },
    });

    const signUp = async (username, password, email,verified) => {

    const hashedPassword = await bcrypt.hash(password,14);

    let checkstmt = "SELECT ([email]) FROM [tracker-db].[dbo].[Clients] WHERE [email] = '%s' ";
    temp = await request.query(format(checkstmt,email));

    console.log(temp.recordset.length)
    var emailcount = temp.recordset.length;

    if(emailcount>0){
        console.log("email já existente");
    }else{
    try{
        var emailToken = jwt.sign(
            {
                username:email,
            },
            env.email.secret,
            {
                algorithm:'HS512',
                expiresIn:'1d',
            },
        );

        const url= `http://localhost:8080/confirmation/${emailToken}`;
        //console.log(url);

        await transporter.sendMail({
            to: email,
            subject: 'Email confirmation',
            html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`,
        });
    }catch (e){
        console.log(e);
    }

    let stmt = "INSERT INTO [tracker-db].[dbo].[Clients] ([username],[password],[email],[verified]) VALUES( '%s','%s','%s','%s')";

    //console.log(format(stmt,username,hashedPassword,email,verified))
    
    res= await request.query(format(stmt,username,hashedPassword,email,verified),async (error,results) => {
        if (error instanceof RequestError){
            console.log("RequestError : Erro inserting into db, check your parameters");
        }
        else{
            console.log("good job")
            return res;
        }})
    }
        
        return null;}
        
       
    

    const authentication = async (email) => {
        const cnx = await getConnection();
        const request = await cnx.request();

        let stmt = "UPDATE [tracker-db].[dbo].[Clients] SET [verified] = 1 WHERE [email] = '%s'";

        console.log(format(stmt,email));

        res = await request.query(format(stmt,email)),async (error,results) => {
            if (error instanceof RequestError){
                console.log(`RequestError : Erro o user ${email}`);
                return error;
            }
            else{
                console.log(`O user ${email}, foi autenticado`);
               
                return res;
            }}
            console.log("pois");
            return null;
        }





        
    const signOn = async (email, password) => {
        const cnx = await getConnection();
        const request = await cnx.request();

        let searchmail = "SELECT ([email]) FROM [tracker-db].[dbo].[Clients] WHERE [email] = '%s' ";
        temp1 = await request.query(format(searchmail,email));
        if(temp1.recordset.length<=0){
            console.log("email não existe");
            return null;//email/phone não existe
        }else{
            console.log("email existe");
            const isverified = "SELECT ([verified]) FROM [tracker-db].[dbo].[Clients] WHERE [email] = '%s' ";
            temp3 = await request.query(format(isverified,email));
            temp3 = temp3.recordset[0].verified;
            if(temp3)
            {
                console.log("email verificado");
                const verifypass = "SELECT ([password]) FROM [tracker-db].[dbo].[Clients] WHERE [email] = '%s' ";
                temp2 = await request.query(format(verifypass,email));
                console.log(temp2);
                await bcrypt.compare(password, temp2.recordset[0].password, function(err, result) {
                    if (result) {
                        console.log("It matches!")
                    }
                    else {
                        console.log("Invalid password!");
                    }
                    });
            }else{
                console.log("email n verificado");
                return null;
            }
        }
        return null;
    }
        return {signUp,authentication,signOn};

}

module.exports = {register};
