const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('Replies with your input!')
        .addStringOption(option => 
            option.setName('input')
                .setDescription('The input to echo back')
                .setMaxLength(2_000)
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to send the message to')
                .addChannelTypes(ChannelType.GuildText))
        .addBooleanOption(option =>
            option.setName('embed')
                .setDescription('Whether or not echo should be embedded')),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        const channel = interaction.options.getChannel('channel');
        const embed = interaction.options.getBoolean('embed');

        try {
            if (channel) {
                if (embed) {
                    const embedMessage = {
                        color: 0x0099ff,
                        description: input,
                    };
                    await channel.send({ embeds: [embedMessage] });
                } else {
                    await channel.send(input);
                }
                await interaction.reply({ content: 'Message sent!', ephemeral: true });
            } else {
                if (embed) {
                    const embedMessage = {
                        color: 0x0099ff,
                        description: input,
                    };
                    await interaction.reply({ embeds: [embedMessage] });
                } else {
                    await interaction.reply(input);
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            await interaction.reply({ content: 'There was an error while sending the message.', ephemeral: true });
        }
    },
};