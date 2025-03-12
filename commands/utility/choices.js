const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gif')
        .setDescription('Sends a random gif')
        .addStringOption(option => 
            option.setName('category')
                .setDescription('What category of gif?')
                .setRequired(true)
                .addChoices(
                    { name: 'funny', value: 'funny' },
                    { name: 'sad', value: 'sad' },
                    { name: 'happy', value: 'happy' }
                )),
    async execute(interaction) {
        const category = interaction.options.getString('category');
        let gifUrl;

        switch (category) {
            case 'funny':
                gifUrl = 'https://example.com/funny.gif';
                break;
            case 'sad':
                gifUrl = 'https://example.com/sad.gif';
                break;
            case 'happy':
                gifUrl = 'https://example.com/happy.gif';
                break;
            default:
                gifUrl = 'https://example.com/default.gif';
                break;
        }

        await interaction.reply({ content: gifUrl });
    },
};