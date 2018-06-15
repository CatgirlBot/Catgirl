const mongoose = require('mongoose');
const User = require('./Schemas/User.js');
const Catgirl = require('./Schemas/Catgirl.js');
class DatabaseHandler
{
    constructor (connectionString)
    {
        this.db = mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', () => console.log('Connected to Mongo @ ' + connectionString));

        this.User = mongoose.model('User', User);
        this.Catgirl = mongoose.model('Catgirl', Catgirl);
        
        mongoose.connect(connectionString);
    }

    static createNewUser(id)
    {
        return new this.User({ _id: id, cash: 0, catgirls: [] });
    }

    userExists(id)
    {
        return new Promise((resolve, reject) => 
        {
            this.User.find({ _id: id }, (err, res) =>
            {
                if (err)
                    reject(err);
                else
                    resolve(res.length !== 0);
            });
        });
    }

    insertUser(user)
    {
        return new Promise((resolve, reject) => 
        {
            user.save((err, res) => 
            {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }

    catgirlExists(id)
    {
        return new Promise((resolve, reject) => 
        {
            this.Catgirl.find({ _id: id }, (err, res) =>
            {
                if (err)
                    reject(err);
                else
                    resolve(res.length !== 0);
            });
        });
    }

    insertUser(catgirl)
    {
        return new Promise((resolve, reject) => 
        {
            catgirl.save((err, res) => 
            {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }
}