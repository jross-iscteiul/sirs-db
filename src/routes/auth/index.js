"use strict"

const signin = require("./signin");

module.exports.register = async server => {
    await signin.register( server );
};