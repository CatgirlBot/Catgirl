const CommandContext = require('./CommandContext.js');

class BaseCommand
{
    constructor (name, description)
    {
        this.name = name;
        this.description = description;
        this.cooldown = 0;

        this.cooldowns = {};
    }

    // To be implemented in subclasses
    invoke(ctx, args) { }
    
    invokeInternal(message, bot, args)
    {
        let ctx = new CommandContext(message, bot);
        let user = message.author;

        if (user.id in this.cooldowns && Date.now() - this.cooldowns[user.id] < this.cooldown * 1000)
        {
            ctx.reply(`This command is on cooldown. It will be usable in ${Math.round(this.cooldown - ((Date.now() - this.cooldowns[user.id]) / 1000))} second(s).`);
            return;
        }

        this.cooldowns[user.id] = Date.now();
        this.invoke(ctx, args);
    }
}

module.exports = BaseCommand;