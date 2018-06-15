const Schema = require('mongoose').Schema;
const Catgirl = require('./Catgirl.js');

const User = new Schema('User',
{
    _id: String,
    cash: Number,
    catgirls: [Catgirl]
});

module.exports = User;