const {SlashCommandBuilder} = require('@discordjs/builders');
module.exports = { 
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides User Info'),
    async execute(interaction) {
        await interaction.reply(`Lovely username: ${interaction.user.username}\nUnique ID: ${interaction.user.id}\n
            Joined at: ${interaction.member.joinedAt}`);
    },
};