/**
 * Created by coskudemirhan on 22/07/2017.
 */

"use strict";
const config = require("../../config"),
    Sequelize = require("sequelize"),
    colors = require("colors/safe");

// Default options for Sequelize
let options = {
    dialect: config.db.dialect,
    define: {
        timestamps: true
    },
    host: config.db.server
};

// Enable logging options for Sequelize if the env mode is dev
if (config.app.env === "dev") {
    options.logging = (str) => {
        console.log(colors.red(str));
    }
}
else{
    options.logging = (str) => {
    }
}
//Create orm object
const orm = new Sequelize(config.db.database, config.db.user, config.db.password, options);

const prefix = config.db.prefix;

module.exports = [Sequelize, orm, prefix];