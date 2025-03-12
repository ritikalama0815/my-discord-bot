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
        let gifUrls;

        switch (category) {
            case 'funny':
                gifUrls = [
                    'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDMwbjRhNHZ4a2g5enE4cHV1anUzbWhhZmtqN3EwbWVuMG84NDNzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tP3M3i03hoIYL6M/giphy.gif',
                    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                    'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif'
                ];
                break;
            case 'sad':
                gifUrls = [
                    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGpweW52M2tsNWh6aGVmZDVhdzN1bHN6Y3Jza2h6aGJucXNrdmVtcyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/W0c3xcZ3F1d0EYYb0f/giphy.gif',
                    'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',
                    'https://media.giphy.com/media/3o6Zt8LdG1pX4VR0kU/giphy.gif'
                ];
                break;
            case 'happy':
                gifUrls = [
                    'https://media.giphy.com/media/7SF5scGB2AFrgsXP63/giphy.gif?cid=790b76114jpynv3kl5hzhefd5aw3ulszcrskhzhbnqskvems&ep=v1_gifs_search&rid=giphy.gif&ct=g',
                    'https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif',
                    'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif'
                ];
                break;
            default:
                gifUrls = [
                    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWN4OXVzcGN5N3hsYmJpeXN6Ym84enV4cGZ1eGEzbmt1Z3BtemVxNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vxBUmPA1bq0RyWi4et/giphy.gif'
                ];
                break;
        }

        const gifUrl = gifUrls[Math.floor(Math.random() * gifUrls.length)];
        await interaction.reply({ content: gifUrl });
    },
};