const Eris = require('eris');
const fs = require('fs');
const DatabaseHandler = require('./DatabaseHandler.js');

class Catgirl
{
    constructor (options, config, commandDirectory, dbConnectionString)
    {
		this.config = config;
		this.client = new Eris(this.config.token, options);
        this.commands = [];
        this.db = new DatabaseHandler(dbConnectionString);

        fs.readdir(commandDirectory, (err, files) => 
        {
            if (err) 
            {
                console.log(err);
                return;
            }

            files.forEach(x => 
            {
                let cmdInstance = null;
                try { cmdInstance = new (require(commandDirectory + x))(); }
                catch (e) { console.log('Failed to load command: ' + x); console.log(e); }
                
                if (cmdInstance)
                {
                    this.commands.push(cmdInstance);
                    console.log('Loaded command: ' + cmdInstance.name);
                }
            });
        });

        let funcs = Object.getOwnPropertyNames(Reflect.getPrototypeOf(this)).filter(x => x.startsWith('event_'));

        funcs.forEach(x => 
        {
            let eventName = x.substring('event_'.length);
            console.log(`Assigning event "${eventName}" to function "${x}"`)
            if (typeof this[x] == 'function')
                this.client.on(eventName, this[x].bind(this));
        });
    }

    event_ready()
    {
        console.log('Ready');
    }

    event_messageCreate(msg)
    {
        let content = msg.content;

        if (!content.startsWith(this.config.prefix) || msg.author.bot)
            return;

        let args = content.trim().split(' ');
        let command = args.shift().substring(this.config.prefix.length);
        let cmd = this.commands.find(x => x.name.toUpperCase() == command.toUpperCase());

        if (cmd)
            cmd.invokeInternal(msg, this, args);
    }

    start() { this.client.connect(); }
}

const options =
{
    disableEveryone: true,
    guildCreateTimeout: 5000,
    defaultImageFormat: 'png',
    defaultImageSize: 256
}

let catgirl = new Catgirl(options, require('./config'), './Commands/', 'mongodb://localhost/database');
catgirl.start();