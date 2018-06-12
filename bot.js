const Eris = require('eris');
const Config = require('./config.json');

var bot = new Eris(Config.token);

bot.on('ready', () => 
{
    console.log('Ready');
});

bot.on('messageCreate', (msg) => 
{
    if(msg.content === 'cat')
        bot.createMessage(msg.channel.id, 'girl');
});

bot.connect();