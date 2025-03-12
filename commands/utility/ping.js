const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = { 
    // cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies To Ping'),
    async execute(interaction) {
        await interaction.reply('SleePING, get it?');
    },
};