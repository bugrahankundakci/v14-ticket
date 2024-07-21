const { Events, EmbedBuilder } = require('discord.js');
const { createTranscript } = require('discord-html-transcripts');
const minik = require('../../minik.json');

module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction) {
        if (interaction.isButton() && interaction.customId === 'ticketisil') {
            const { guild, channel } = interaction;
            const transcript = await createTranscript(channel, {
                limit: -1,
                returnType: 'attachment',
                saveImages: true,
                poweredBy: false,
                filename: `${channel.name}-${channel.id}.html`,
            }).catch(error => { console.error(error); return; });

            const transcriptTimestamp = Math.round(Date.now() / 1000);
            const transcriptEmbed = new EmbedBuilder()
                .setDescription(`Ticket transcript for <#${channel.id}>\nTime: <t:${transcriptTimestamp}:R> (<t:${transcriptTimestamp}:F>)`)
                .setColor('Aqua');

            const transcriptsChannel = guild.channels.cache.get(minik.ticket.transcriptsChannelId);
            if (transcriptsChannel) {
                await transcriptsChannel.send({
                    embeds: [transcriptEmbed],
                    files: [transcript],
                }).catch(error => { console.error(error); return; });
            } else {
                console.error('Transcript channel not found');
            }

            await interaction.channel.send({ content: `<@${interaction.user.id}> tarafından siliniyor.`, ephemeral: false });
            setTimeout(() => interaction.channel.delete(), 2500);
        }
    }
}
