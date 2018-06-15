const Schema = require('mongoose').Schema;

const Catgirl = new Schema('Catgirl',
{
    _id: String,
    ownerId: String,
    happiness: Number,
    imageHash: String,
    personality: String,
});

module.exports = Catgirl;