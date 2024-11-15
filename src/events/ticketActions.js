const { Events, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const minik = require('../../minik.json');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isStringSelectMenu() && interaction.customId === 'ticket-actions') {
            const selectedValue = interaction.values[0];

            switch (selectedValue) {
                case 'kaydetkapat':
                    await interaction.reply({ content: `<@${interaction.user.id}> Ticket kapanıyor...`, ephemeral: false });
                    
                    await interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: minik.ticket.yetkili.baskaproblemler,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ]);

                    const minikinbutonu = new ButtonBuilder()
                        .setCustomId('ticketisil')
                        .setLabel('Ticketi Sil')
                    //    .setEmoji('1264482781069574185')
                        .setStyle(ButtonStyle.Danger);

                    const militaninactionu = new ActionRowBuilder()
                        .addComponents(minikinbutonu);

                    await interaction.channel.send({
                        content: `<@${interaction.user.id}> Ticket silinsin mi?`,
                        components: [militaninactionu]
                    });

                    break;

                case 'bencozdum':
                    await interaction.reply({ content: `<@${interaction.user.id}> Ticket kapanıyor...`, ephemeral: false });
                    
                    await interaction.channel.permissionOverwrites.set([
                        {
                            id: interaction.guild.roles.everyone.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: minik.ticket.yetkili.yonetim,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ]);

                    const minikinbutonuu = new ButtonBuilder()
                        .setCustomId('ticketisil')
                        .setLabel('Ticketi Sil')
                    //    .setEmoji('1264482781069574185')
                        .setStyle(ButtonStyle.Danger);

                    const militaninactionuu = new ActionRowBuilder()
                        .addComponents(minikinbutonuu);

                    await interaction.channel.send({
                        content: `<@${interaction.user.id}> Ticket silinsin mi?`,
                        components: [militaninactionuu]
                    });
                    break;

                default:
                    await interaction.reply({ content: 'Geçersiz seçenek!', ephemeral: true });
                    break;
            }
        }
    }
};
