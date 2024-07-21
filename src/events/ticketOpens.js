const { Events, PermissionsBitField, StringSelectMenuBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const minik = require('../../minik.json');
const ticketChannels = new Map();

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isStringSelectMenu() && interaction.customId === 'ticket-olustur') {
            const selectedValue = interaction.values[0];

            const militaninmenusu = new StringSelectMenuBuilder()
                .setCustomId('ticket-actions')
                .setPlaceholder('Ticketi yönetmek İçin Kategori Seçiniz.')
                .addOptions([
                    {
                        label: 'Kayıt et ve kapat.',
                        emoji: '1264482870249000981',
                        description: 'Deneme',
                        value: 'kaydetkapat',
                    },
                    {
                        label: 'Sorunumu ben çözdüm.',
                        description: 'Deneme',
                        emoji: '1264482781069574185',
                        value: 'bencozdum',
                    },
                ]);

            const actionRowMenu = new ActionRowBuilder().addComponents(militaninmenusu);

            switch (selectedValue) {
                case 'destekbug':
                    await interaction.reply({ content: `<@${interaction.user.id}> Ticketin açılıyor...`, ephemeral: true });
                    const destekticketi = await interaction.guild.channels.create({
                        type: ChannelType.GuildText,
                        parent: minik.ticket.kategori.destekbug,
                        name: `${interaction.user.username}-destekbug`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: minik.ticket.yetkili.destekbug,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                        ],
                    });
                    ticketChannels.set(interaction.user.id, destekticketi.id);

                    const destekbugmesaj = `Destek & Bug, Teknik Sorunlar hakkında ticket açtı.`;
                    const militaninticketegonderdigimesaj = new EmbedBuilder()
                        .setColor('#000000')
                        .setTitle(`${interaction.user.username} - ${destekbugmesaj}`)
                        .setDescription(minik.ticket.menuayarlari.icmesaj);
                    await destekticketi.send({
                        content: `<@${interaction.user.id}> - <@&${minik.ticket.yetkili.destekbug}>`,
                        embeds: [militaninticketegonderdigimesaj],
                        components: [actionRowMenu]
                    });
                    break;

                case 'icproblemler':
                    await interaction.reply({ content: `<@${interaction.user.id}> Ticketin açılıyor...`, ephemeral: true });
                    const icproblemticketi = await interaction.guild.channels.create({
                        type: ChannelType.GuildText,
                        parent: minik.ticket.kategori.icproblemler,
                        name: `${interaction.user.username}-icsorunlar`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: minik.ticket.yetkili.icproblemler,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                        ],
                    });
                    ticketChannels.set(interaction.user.id, icproblemticketi.id);

                    const icproblemmesaj = `Ic problemler - oyun içi destek, Teknik Sorunlar hakkında ticket açtı.`;
                    const militaninembedmessagesi = new EmbedBuilder()
                        .setColor('#000000')
                        .setTitle(`${interaction.user.username} - ${icproblemmesaj}`)
                        .setDescription(minik.ticket.menuayarlari.icmesaj);

                    await icproblemticketi.send({
                        content: `<@${interaction.user.id}> - <@&${minik.ticket.yetkili.icproblemler}>`,
                        embeds: [militaninembedmessagesi],
                        components: [actionRowMenu]
                    });
                    break;

                    case 'ozelmenu':
                        await interaction.reply({ content: `<@${interaction.user.id}> Ticketin açılıyor...`, ephemeral: true });
                        const ozelmenuticketi = await interaction.guild.channels.create({
                            type: ChannelType.GuildText,
                            parent: minik.ticket.kategori.ozelmenu,
                            name: `${interaction.user.username}-ticket`,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.roles.everyone.id,
                                    deny: [PermissionsBitField.Flags.ViewChannel],
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [PermissionsBitField.Flags.ViewChannel],
                                },
                                {
                                    id: minik.ticket.yetkili.icproblemler,
                                    allow: [PermissionsBitField.Flags.ViewChannel],
                                },
                            ],
                        });
                        ticketChannels.set(interaction.user.id, ozelmenuticketi.id);
    
                        const ozelmenumesaj = `Yardım ve destek almak için ticket açtı.`;
                        const ozelmenumessagesi = new EmbedBuilder()
                            .setColor('#000000')
                            .setTitle(`${interaction.user.username} - ${ozelmenumesaj}`)
                            .setDescription(minik.ticket.menuayarlari.icmesaj);
    
                        await ozelmenuticketi.send({
                            content: `<@${interaction.user.id}> - <@&${minik.ticket.yetkili.ticket}>`,
                            embeds: [ozelmenumessagesi],
                            components: [actionRowMenu]
                        });
                        break;


                case 'otherproblems':
                    await interaction.reply({ content: `<@${interaction.user.id}> Ticketin açılıyor...`, ephemeral: true });
                    const otherproblemticketi = await interaction.guild.channels.create({
                        type: ChannelType.GuildText,
                        parent: minik.ticket.kategori.otherproblemler,
                        name: `${interaction.user.username}-ticket`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: minik.ticket.yetkili.otherproblemler,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                        ],
                    });
                    ticketChannels.set(interaction.user.id, otherproblemticketi.id);

                    const otherproblemmesaj = `Başka problemleri olduğu için kişi sorununu belirtmedi, ticket açtı.`;
                    const militaninembedmessagesi3 = new EmbedBuilder()
                        .setColor('#000000')
                        .setTitle(`${interaction.user.username} - ${otherproblemmesaj}`)
                        .setDescription(minik.ticket.menuayarlari.icmesaj);

                    await otherproblemticketi.send({
                        content: `<@${interaction.user.id}> - <@&${minik.ticket.yetkili.otherproblemler}>`,
                        embeds: [militaninembedmessagesi3],
                        components: [actionRowMenu]
                    });
                    break;

                case 'baskaproblems':
                    const baskaproblemticketi = await interaction.guild.channels.create({
                        type: ChannelType.GuildText,
                        parent: minik.ticket.kategori.baskaproblemler,
                        name: `${interaction.user.username}-ozel`,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.roles.everyone.id,
                                deny: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: interaction.user.id,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                            {
                                id: minik.ticket.yetkili.baskaproblemler,
                                allow: [PermissionsBitField.Flags.ViewChannel],
                            },
                        ],
                    });
                    ticketChannels.set(interaction.user.id, baskaproblemticketi.id);

                    const baskaproblemsModal = new ModalBuilder()
                        .setCustomId('baskaproblemsModal')
                        .setTitle('Sorununu belirt.');

                    const changeNameInput = new TextInputBuilder()
                        .setCustomId('acikcasorun')
                        .setLabel('Sorununu açık ve net bir şekilde belirt.')
                        .setPlaceholder('Sorununu açık ve net bir şekilde belirt.')
                        .setStyle(TextInputStyle.Paragraph);

                    const changeActionRow = new ActionRowBuilder()
                        .addComponents(changeNameInput);

                    baskaproblemsModal.addComponents(changeActionRow);
                    await interaction.showModal(baskaproblemsModal);
                    break;

                case 'sifirla':
                    await interaction.reply({ content: `<@${interaction.user.id}> Başarılı bir şekilde seçenek sıfırlandı.`, ephemeral: true });
                    break;

                default:
                    await interaction.reply({ content: 'Geçersiz seçenek!', ephemeral: true });
                    break;
            }
        } else if (interaction.isModalSubmit() && interaction.customId === 'baskaproblemsModal') {
            const acikcasorun = interaction.fields.getTextInputValue('acikcasorun');
            const ticketId = ticketChannels.get(interaction.user.id);
            const ticketChannel = interaction.guild.channels.cache.get(ticketId);

            if (ticketChannel) {
                const militaninembedmessagesii = new EmbedBuilder()
                    .setColor('#000000')
                    .setTitle(`${interaction.user.username}`)
                    .setDescription(`${acikcasorun}.`);

                await interaction.reply({ content: `${acikcasorun}.`, ephemeral: true });

                const militaninmenusu = new StringSelectMenuBuilder()
                .setCustomId('ticket-actions')
                .setPlaceholder('Ticket Açmak İçin Kategori Seçiniz.')
                .addOptions([
                    {
                        label: 'Kayıt et ve kapat.',
                        emoji: '1264482870249000981',
                        description: 'Deneme',
                        value: 'kaydetkapat',
                    },
                    {
                        label: 'Sorunumu ben çözdüm.',
                        description: 'Deneme',
                        emoji: '1264482781069574185',
                        value: 'bencozdum',
                    },
                ]);

            const actionRowMenu = new ActionRowBuilder().addComponents(militaninmenusu);



                await ticketChannel.send({
                    content: `<@${interaction.user.id}> - <@&${minik.ticket.yetkili.baskaproblemler}>`,
                    embeds: [militaninembedmessagesii],
                    components: [actionRowMenu]
                });
            }
        }
    },
};
