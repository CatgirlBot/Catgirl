const BaseCommand = require('../Structures/BaseCommand.js');

class CommandHelp extends BaseCommand
{
    constructor() { super('help', 'The help command.'); this.cooldown = 10; }

    invoke(ctx, args)
    {
        let fields = []

        ctx.bot.commands.forEach(x => fields.push(
        {
            name: ctx.bot.config.prefix + x.name,
            value: x.description,
            inline: false
        }
        ));

        let embed = 
        {
            title: 'Catgirl Manual',
            description: 'yeah here are the commands or whatever',
            fields: fields
        }

        ctx.replyEmbed(embed);
    }
}

module.exports = CommandHelp;