const { PermissionFlagsBits, SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } = require('discord.js');
const minik = require('../../minik.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ozel-ticket-olustur')
        .setDescription('Diğer menülere göre biraz daha gelişmiş hali.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

        
    async execute(interaction) {


        const militaninticketmodali = new ModalBuilder()
            .setCustomId('militaninticketbaslangicmodali')
            .setTitle('Ticket Oluştur!');

            const militanintitlesi = new TextInputBuilder()
            .setCustomId('militanintitlesisecenegi')
            .setLabel('Embed içerisindeki title')
            .setPlaceholder('Embed içerisindeki title\'da yani en üstünde ne yazmasını istiyorsun?')
            .setMaxLength(15)
            .setStyle(TextInputStyle.Short);

            const militanindesci = new TextInputBuilder()
            .setCustomId('militanindescisecenegi')
            .setLabel('Embed içerisindeki mesaj')
            .setPlaceholder('Embed içerisindeki mesaj\'da yani içerisinde ne yazmasını istiyorsun?')
            .setStyle(TextInputStyle.Paragraph);

        const militaninbirincisecenegi = new TextInputBuilder()
            .setCustomId('militaninbirincisecenegi')
            .setLabel('Birinci seçenekte ne yazıcak?')
            .setPlaceholder('Birinci seçenekte ne yazmasını istiyorsun?')
            .setMaxLength(25)
            .setStyle(TextInputStyle.Short);

        const militaninikincisecenegi = new TextInputBuilder()
            .setCustomId('militaninikincisecenegi')
            .setLabel('Ikinci seçenekte ne yazıcak?')
            .setPlaceholder('Ikinci seçenekte ne yazmasını istiyorsun?')
            .setMaxLength(25)
            .setStyle(TextInputStyle.Short);

        const militaninucuncusecenegi = new TextInputBuilder()
            .setCustomId('militaninucuncusecenegi')
            .setLabel('Üçüncü seçenekte ne yazıcak?')
            .setPlaceholder('Üçüncü seçenekte ne yazmasını istiyorsun?')
            .setMaxLength(25)
            .setStyle(TextInputStyle.Short);

        const minikinbirincisecenegi = new ActionRowBuilder().addComponents(militaninbirincisecenegi);
        const minikinikincisecenegi = new ActionRowBuilder().addComponents(militaninikincisecenegi);
        const minikinucuncusecenegi = new ActionRowBuilder().addComponents(militaninucuncusecenegi);
        const minikintitlesi = new ActionRowBuilder().addComponents(militanintitlesi);
        const minikindesci = new ActionRowBuilder().addComponents(militanindesci);
        militaninticketmodali.addComponents(minikintitlesi,minikindesci, minikinbirincisecenegi, minikinikincisecenegi, minikinucuncusecenegi);
        await interaction.showModal(militaninticketmodali);

        const filter = (i) => i.customId === 'militaninticketbaslangicmodali';
        interaction.awaitModalSubmit({ filter , time: 90000 }).then(async (modalSubmitInteraction) => {
            const militanintitlesi = modalSubmitInteraction.fields.getTextInputValue('militanintitlesisecenegi')
            const militanindesci = modalSubmitInteraction.fields.getTextInputValue('militanindescisecenegi')
            const militaninbirincisecenegii = modalSubmitInteraction.fields.getTextInputValue('militaninbirincisecenegi');
            const militaninikincisecenegii = modalSubmitInteraction.fields.getTextInputValue('militaninikincisecenegi');
            const militaninucuncusecenegii = modalSubmitInteraction.fields.getTextInputValue('militaninucuncusecenegi');

            const militanembed = new EmbedBuilder()
                .setTitle(militanintitlesi)
                .setColor('ff0400')
                .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription(`${militanindesci}.`);

            const militaninmenusu = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('ticket-olustur')
                        .setPlaceholder(minik.ticket.menuayarlari.menuplaceholder)
                        .addOptions([
                            {
                                label: militaninbirincisecenegii,
                                emoji: minik.ticket.menuayarlari.birsecenekemoji,
                            //    description: minik.ticket.menuayarlari.birsecenekaciklama,
                                value: 'ozelmenu',
                            },
                            {
                                label: militaninikincisecenegii,
                                emoji: minik.ticket.menuayarlari.ikisecenekemoji,
                             //   description: minik.ticket.menuayarlari.ikisecenekaciklama,
                                value: 'destekbug',
                            },
                            {
                                label: militaninucuncusecenegii,
                                emoji: minik.ticket.menuayarlari.dortsecenekemoji,
                           //     description: minik.ticket.menuayarlari.dortsecenekaciklama,
                                value: 'otherproblems',
                            },
                            {
                                label: 'Seçenek Sıfırla',
                                description: 'Menüdeki seçeneğinizi sıfırlarsınız.',
                                emoji: '1264482771049386014',
                                value: 'sifirla',
                            },
                        ])
                );

            await interaction.channel.send({
                content: `||@everyone|| & ||@here||`,
                embeds: [militanembed],
                components: [militaninmenusu]
            });

    

            await modalSubmitInteraction.reply({ content: 'Ticket oluşturma menüsü gönderildi.', ephemeral: true });
        }).catch(console.error);
    }
};
