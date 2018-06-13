const BaseCommand = require('../Structures/BaseCommand.js');

class CommandHelp extends BaseCommand
{
    constructor() { super('help', 'The help command.'); this.cooldown = 10; }

    invoke(ctx, args)
    {
        ctx.reply('Lol');
    }
}

module.exports = CommandHelp;