const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = { 
    data: new SlashCommandBuilder()
        .setName('slap')
        .setDescription('Slaps the user'),
    async execute(interaction) {
        await interaction.reply('👋');
    },
};