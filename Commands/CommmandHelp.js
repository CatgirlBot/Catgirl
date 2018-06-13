const BaseCommand = require('../Structures/BaseCommand.js');

class CommandHelp extends BaseCommand
{
    constructor() { super('help', 'The help command.', 'help'); this.cooldown = 10; }

    async invoke(ctx, args)
    {
        let fields = []

        ctx.bot.commands.forEach(x => fields.push(
        {
            name: ctx.bot.config.prefix + x.name,
            value: `Description: ${x.description}\nSyntax: ${ctx.bot.config.prefix + x.syntax}`,
            inline: false
        }
        ));

        let embed = 
        {
            title: 'Catgirl Manual',
            description: 'yeah here are the commands or whatever',
            fields: fields
        }

        await ctx.replyEmbed(embed);
    }
}

module.exports = CommandHelp;