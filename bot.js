const Eris = require('eris');
const Config = require('./config.json');
const fs = require('fs');

var bot = new Eris(Config.token);
var commands = [];

fs.readdir("./Commands/", (err, files) => 
{
    if (err)
    {
        console.log(err);
        return;
    }

    files.forEach(x => 
    {
        let cmdInstance = new (require('./Commands/' + x))();
        console.log('Loaded command: ' + cmdInstance.name);
        commands.push(cmdInstance);
    });
});

bot.on('ready', () => 
{
    console.log('Ready');
});

bot.on('messageCreate', (msg) => 
{
    let content = msg.content;

    if (!content.startsWith(Config.prefix))
        return;
    
    let args = content.trim().split(' ');
    let command = args.shift().substring(Config.prefix.length);
    let cmd = commands.find(x => x.name.toUpperCase() == command.toUpperCase());

    if (cmd)
        cmd.invokeInternal(msg, bot, args);
});

bot.connect();