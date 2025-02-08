import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

class Statistics {
  uptime: number;
  constructor() {
    this.uptime = process.uptime();
  }

  getUptime(): string {
    const [d, h, m, s] = [
      Math.floor(this.uptime / 86400),
      Math.floor(this.uptime / 3600) % 24,
      Math.floor(this.uptime / 60) % 60,
      Math.floor(this.uptime) % 60,
    ];
    return `${d > 0 ? `${d} days, ` : ""}${h > 0 ? `${h} hours, ` : ""}${
      m > 0 ? `${m} minutes, ` : ""
    }${s} seconds`;
  }
}

export const StatsCommand = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get the bot statistics"),
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const stats = new Statistics();
    const uptime = stats.getUptime();
    const apiLatency = Date.now() - interaction.createdTimestamp;
    const websocketLatency = interaction.client.ws.ping;

    let [totalMembers, totalHumans, totalBots] = [0, 0, 0];

    for (const guild of interaction.client.guilds.cache.values()) {
      await guild.members.fetch();
      totalMembers += guild.memberCount;
      totalHumans += guild.members.cache.filter(
        (member) => !member.user.bot
      ).size;
      totalBots += guild.members.cache.filter((member) => member.user.bot).size;
    }
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle("Bot Statistics")
      .setDescription(
        `
            **Uptime:** \`${uptime}\`\n
            **API Latency:** \`${apiLatency}ms\`\n
            **Websocket Latency:** \`${websocketLatency}ms\`\n
            **Node.js Version:** \`${process.version}\`\n
            **Discord.js Version:** \`14.17.3\`\n
            **Members:** \`${totalMembers}\` (Humans: \`${totalHumans}\`, Bots: \`${totalBots}\`)
            `
      )
      .setTimestamp()
      .setColor("Blue");

    await interaction.reply({ embeds: [embed] });
    setTimeout(async () => {
      await interaction.deleteReply();
    }, 20000);
  },
};
