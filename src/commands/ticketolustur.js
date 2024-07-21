const { SlashCommandBuilder, EmbedBuilder, StringSelectMenuBuilder, PermissionFlagsBits, ActionRowBuilder } = require('discord.js');
const minik = require('../../minik.json');
const openTickets = new Set();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-olustur')
        .setDescription('Kullanıcıların ticket oluşturması için ticket menüsü gönderir.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        if (openTickets.has(interaction.user.id)) {
            await interaction.reply({ content: 'Zaten açık bir ticketiniz var.', ephemeral: true });
            return;
        }


        const militanembed = new EmbedBuilder()
            .setTitle('Ticket Oluştur')
            .setColor('ff0400')
            .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription(minik.ticket.menuayarlari.mesaj);

        const militaninmenusu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('ticket-olustur')
                    .setPlaceholder(minik.ticket.menuayarlari.menuplaceholder)
                    .addOptions([
                        {
                            label: minik.ticket.menuayarlari.birseceneklabel,
                            emoji: minik.ticket.menuayarlari.birsecenekemoji,
                            description: minik.ticket.menuayarlari.birsecenekaciklama,
                            value: 'destekbug',
                        },
                        {
                            label: minik.ticket.menuayarlari.ikiseceneklabel,
                            emoji: minik.ticket.menuayarlari.ikisecenekemoji,
                            description: minik.ticket.menuayarlari.ikisecenekaciklama,
                            value: 'icproblemler',
                        },
                        {
                            label: minik.ticket.menuayarlari.dortseceneklabel,
                            emoji: minik.ticket.menuayarlari.dortsecenekemoji,
                            description: minik.ticket.menuayarlari.dortsecenekaciklama,
                            value: 'otherproblems',
                        },
                        {
                            label: minik.ticket.menuayarlari.ucseceneklabel,
                            emoji: minik.ticket.menuayarlari.ucsecenekemoji,
                            description: minik.ticket.menuayarlari.ucsecenekaciklama,
                            value: 'baskaproblems',
                        },
                        {
                            label: 'Seçenek Sıfırla',
                            description: 'Menüdeki seçeneğinizi sıfırlarsınız.',
                            emoji: '1264482771049386014',
                            value: 'sifirla',
                        },
                    ])
            );
        await interaction.reply({ content: 'Ticket oluşturma menüsü gönderiliyor...', ephemeral: true });

        await interaction.channel.send({
            content: `||@everyone|| & ||@here||`,
            embeds: [militanembed],
            components: [militaninmenusu]
        });

        openTickets.add(interaction.user.id);
        await interaction.editReply({ content: 'Ticket oluşturma menüsü gönderildi.' });
    }
};
