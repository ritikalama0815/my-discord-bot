const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Server Information'),
    async execute(interaction) {
        await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
    },
};