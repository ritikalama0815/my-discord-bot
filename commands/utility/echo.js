const { SlashCommandBuilder } = require('discord.js');

const data = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option => 
        option.setName('input')
            .setDescription('The input to echo back')
            //to ensure that text will fit in a message
            .setMaxLength(2_000)
            .setRequired(true))
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('The channel to send the message to')
            .addChannelTypes(ChannelType.GuildText))
    .addBooleanOption(option =>
        option.setName('embed')
            .setDescription('Whether or not echo should be embedded'));
            