import { Events, Interaction, CommandInteraction } from "discord.js";
import { commands } from "@/main";

export const InteractionCreate = {
  name: Events.InteractionCreate,
  once: false,
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `[Commands] Command ${interaction.commandName} is not registered or does not exist.`
      );
      return;
    }

    try {
      await (
        command as {
          execute: (interaction: CommandInteraction) => Promise<void>;
        }
      ).execute(interaction as CommandInteraction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
            content: "There was an error while executing this command!",
            ephemeral: true,
        })
      }
    }
  },
};
