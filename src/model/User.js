"use strict"




function User (email,username,password,public_key){
this.email = email;
this.username = username;
this.password = password;
this.public_key = public_key

}

module.exports = {User}