const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = { 
    // cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('k*ss someone'),
    async execute(interaction) {
        await interaction.reply('muah! 💋.. how lucky');
    },
};