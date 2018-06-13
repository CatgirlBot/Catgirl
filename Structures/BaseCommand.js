const CommandContext = require('./CommandContext.js');

class BaseCommand
{
    constructor (name, description, syntax)
    {
        // All subclasses (commands) should call super(name, description, syntax)
        // Overrides for default cooldown can be done if desired
        this.name = name;
        this.description = description;
        this.synax = syntax;

        this.cooldown = 3;
        this.isOwner = false;

        this.cooldowns = {};
        this.invalidArgs = 'Invalid arguments were passed to this command. See the help command for information on how to use it.'
    }

    // To be implemented in subclasses
    async invoke(ctx, args) { }
    
    invokeInternal(message, bot, args)
    {
        let client = bot.client;
        let ctx = new CommandContext(message, client, bot);
        let user = message.author;

        if (this.isOwner && !(user.id in bot.config.owners))
            return;

        if (user.id in this.cooldowns && Date.now() - this.cooldowns[user.id] < this.cooldown * 1000)
        {
            ctx.reply(`This command is on cooldown. It will be usable in ${Math.round(this.cooldown - ((Date.now() - this.cooldowns[user.id]) / 1000))} second(s).`);
            return;
        }

        this.cooldowns[user.id] = Date.now();
        this.invoke(ctx, args).catch(e => this.handleError(ctx, e));
    }

    async handleError(ctx, error)
    {
        try {await ctx.reply('An error popped up. Try the command again. If it doesn\'t work, you should probably report this to a bot dev.'); }
        catch (e) { return; }
        console.log(`[${new Date()}] ${error}`);
    }
}

module.exports = BaseCommand;