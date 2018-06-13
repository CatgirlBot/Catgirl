const Eris = require('eris');
require('./config.json');
const fs = require('fs');

class Catgirl
{
    constructor (config, commandDirectory)
    {
        this.config = config;
        this.client = new Eris(this.config.token);
        this.commands = [];

        fs.readdir(commandDirectory, (err, files) => 
        {
            if (err) 
            {
                console.log(err);
                return;
            }

            files.forEach(x => 
            {
                let cmdInstance = new (require(commandDirectory + x))();
                console.log('Loaded command: ' + cmdInstance.name);
                this.commands.push(cmdInstance);
            });
        });

        this.client.on('ready', () => 
        {
            console.log('Ready');
        });

        this.client.on('messageCreate', (msg) => 
        {
            let content = msg.content;

            if (!content.startsWith(this.config.prefix))
                return;

            let args = content.trim().split(' ');
            let command = args.shift().substring(this.config.prefix.length);
            let cmd = this.commands.find(x => x.name.toUpperCase() == command.toUpperCase());

            if (cmd)
                cmd.invokeInternal(msg, this.client, this, args);
        });
    }

    start() { this.client.connect(); }
}

let catgirl = new Catgirl(require('./config'), './Commands/');
catgirl.start();