const BaseCommand = require('../Structures/BaseCommand.js');
const fs = require('fs');

class CommandReload extends BaseCommand
{
    constructor() { super('reload', 'Reloads a command.', 'reload <command>'); }

    async invoke(ctx, args)
    {
        if (args.length < 1)
        {
            await ctx.reply(this.invalidArgs);
            return;
        }

        if (!ctx.bot.commands.some(x => x.name.toUpperCase() === args[0].toUpperCase()))
        {
            await ctx.reply('No command by that name was found.');
            return;
        }
        
        const oldCommand = ctx.bot.commands.find(x => x.name.toUpperCase() === args[0].toUpperCase());
        ctx.bot.commands = ctx.bot.commands.filter(x => x.name.toUpperCase() !== args[0].toUpperCase());

        let cmdInstance = null;
        const files = fs.readdirSync('./Commands');

        for (let i = 0; i < files.length; i++)
        {
            const fName = files[i];
            try { cmdInstance = new (require('./' + fName))(); }
            catch (e) { console.log(e); }

            if (cmdInstance !== null && cmdInstance.name.toUpperCase() === args[0].toUpperCase())
                break;
        }

        if (cmdInstance === null)
        {
            ctx.bot.commands.push(oldCommand);
            await ctx.reply('Something went wrong...');
            return;
        }
        
        ctx.bot.commands.push(cmdInstance);
        await ctx.reply('The command has been reloaded.')
    }
}

module.exports = CommandReload;