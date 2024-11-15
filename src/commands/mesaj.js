const { SlashCommandBuilder,EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const minik = require('../../minik.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mesaj')
    .setDescription('Başvuru göndermeleri için buton oluşturursunuz.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('Başvuru embedi hangi odaya atılacak?')
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildText)
    )
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('Embedin içindeki en üste yazılacak olan mesaj.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('Choose a description for the ticket embed.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('image')
        .setDescription('Embed içerisine atılacak olan image.')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('content')
        .setDescription('Embed Üstüne ne yazalım?')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('ticketmenusu')
        .setDescription('Helper butonunda ne yazacak?')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('color')
        .setDescription('Embed hangi renk olacak?')
        .setRequired(false)
    )
    .addStringOption(option =>
      option
        .setName('footer')
        .setDescription('Butonun footer\'ı ne olacak?')
        .setRequired(false)
    ),
  async execute(interaction) {




    const { guild, options } = interaction;
    try {
      const channel = options.getChannel('channel');
      const title = options.getString('title');
      const description = options.getString('description');
      const image = options.getString('image');
      const color = options.getString('color') || '#FFFFFF';
      const ticketmenusu = options.getString('ticketmenusu');
      const embedfooter = options.getString('footer');
      const content = options.getString('content');

      const embed = new EmbedBuilder()
        .setDescription(description)
        .setImage(image)
        .setTitle(title)
        .setColor(color)
        .setFooter({ text: embedfooter })
        .setTimestamp();

      const components = [];

      if (ticketmenusu) {

const militaninticketmenusu  =   new StringSelectMenuBuilder()
.setCustomId('ticket-olustur')
.setPlaceholder(minik.ticket.menuayarlari.menuplaceholder)
.addOptions([
    {
        label: minik.ticket.menuayarlari.birseceneklabel,
    //    emoji: minik.ticket.menuayarlari.birsecenekemoji,
        description: minik.ticket.menuayarlari.birsecenekaciklama,
        value: `destekbug`,
    },
    {
        label: minik.ticket.menuayarlari.ikiseceneklabel,
    //    emoji: minik.ticket.menuayarlari.ikisecenekemoji,
        description: minik.ticket.menuayarlari.ikisecenekaciklama,
        value: `icproblemler`,
    },
    {
        label: minik.ticket.menuayarlari.dortseceneklabel,
    //    emoji: minik.ticket.menuayarlari.dortsecenekemoji,
        description: minik.ticket.menuayarlari.dortsecenekaciklama,
        value: `otherproblems`,
    },
    {
        label: minik.ticket.menuayarlari.ucseceneklabel,
      //  emoji: minik.ticket.menuayarlari.ucsecenekemoji,
        description: minik.ticket.menuayarlari.ucsecenekaciklama,
        value: `baskaproblems`,
    },
    {
        label: `Seçenek Sıfırla`,
        description: `Menüdeki seçeneğinizi sıfırlarsınız.`,
    //    emoji: '1264482771049386014',
        value: `sifirla`,
    },
])



          components.push(militaninticketmenusu);
      }

      const actionRow = components.length ? new ActionRowBuilder().addComponents(components) : null;

      await guild.channels.cache.get(channel.id).send({
        content: `${content}.`,
        embeds: [embed],
        components: actionRow ? [actionRow] : [],
      });

    

      await interaction.reply({
        content: 'Başvuru başarıyla oluşturuldu!',
        ephemeral: true
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({
        content: 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.',
        ephemeral: true
      });
    }
  },
};
