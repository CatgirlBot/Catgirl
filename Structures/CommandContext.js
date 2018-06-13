const Eris = require('eris');

class CommandContext
{
    constructor (message, client, bot)
    {
        this.message = message;
        this.messageContent = message.content;
        this.author = message.author;
        this.channel = message.channel;
        this.guild = message.channel instanceof Eris.TextChannel ? message.channel.guild : null;
        this.client = client;
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

        this.client.createMessage(this.channel.id, content);
    }

    replyEmbed(embed) { this.reply('', embed); }
}

module.exports = CommandContext