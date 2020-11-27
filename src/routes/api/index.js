"use strict"

const trackers = require("./trackers");

module.exports.register = async server => {
    await trackers.register( server );
};