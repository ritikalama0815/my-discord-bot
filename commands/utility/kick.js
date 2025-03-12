const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = { 
    // cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kicks someone'),
    async execute(interaction) {
        await interaction.reply('OH BOY, YOU BOUTTA GET KICKED... ||kidding, you cant kick, how unfortunate||');
    },
};