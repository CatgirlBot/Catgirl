const Eris = require('eris');

class CommandContext
{
    constructor (message, bot)
    {
        this.message = message;
        this.messageContent = message.content;
        this.author = message.author;
        this.channel = message.channel;
        this.guild = message.channel instanceof Eris.TextChannel ? message.channel.guild : null;
        this.bot = bot;
    }

    reply(text, embed)
    {
        let content = 
        {
            content: text,
            tts: false,
            disableEveryone: true
        }

        if (typeof embed !== undefined)
            content.embed = embed

        this.bot.createMessage(this.channel.id, content);
    }

    replyEmbed(embed)
    {
        let content = 
        {
            content: '',
            tts: false,
            disableEveryone: true,
            embed: embed
        }

        this.bot.createMessage(this.channel.id, content);
    }
}

module.exports = CommandContext