import "@/utils/logger";
import {
  Client,
  Collection,
  CommandInteraction,
  REST,
  Routes,
  SlashCommandBuilder,
} from "discord.js";

import * as dotenv from "dotenv";
import * as Commands from "@/commands";
import * as Events from "@/events";

dotenv.config();

const token: string = (process.env.TOKEN as string) || ("" as string);
const clientId: string = (process.env.CLIENT_ID as string) || ("" as string);

/**
 * @interface Command - The Command Interface
 * @property {SlashCommandBuilder} data - The command data
 * @property {Function} execute - The command execution
 * @returns {void}
 */
interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

/**
 * @interface Event - The event interface
 * @property {string} name - The event name
 * @property {boolean} [once] - Whether the event should only trigger once
 * @property {(...args: any[]) => Promise<void>} execute - The event execution
 * @returns {void}
 */
interface Event {
  name: string;
  once?: boolean;
  execute: (...args: any[]) => Promise<void>;
}

/**
 * @constant {Client} client - The client interface
 * @returns {Client}
 */
const client: Client = new Client({
  intents: ["Guilds", "GuildMessages", "GuildMembers"],
});

export const commands = new Collection<string, Command>();

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  const commandsToRegister: Array<Record<string, any>> = [];
  for (const protoCommand in Commands) {
    if (Object.prototype.hasOwnProperty.call(Commands, protoCommand)) {
      const command: Command = (
        Commands as unknown as { [key: string]: Command }
      )[protoCommand];
      if ("data" in command && "execute" in command) {
        commands.set(command.data.name, command);
        console.log(`[Commands] Registering ${command.data.name}`);
        commandsToRegister.push(command.data.toJSON());
      } else {
        console.warn(
          `[Commands] Skipping ${protoCommand} due to missing data or execute method`
        );
      }
    }
  }

  try {
    if (commandsToRegister.length > 0) {
      console.log(`[Commands] Reloading application (/) commands...`);
      await rest.put(Routes.applicationCommands(clientId), { body: [] });
      const data = await rest.put(Routes.applicationCommands(clientId), {
        body: commandsToRegister,
      });
      console.log(
        `[Commands] Successfully reloaded ${
          (data as any[]).length
        } application (/) commands.`
      );
    } else {
      console.warn(`[Commands] No commands to register.`);
    }
  } catch (error) {
    console.error(`[Commands] Error while registering commands: ${error}`);
  }
})();

for (const eventName in Events) {
  if (Object.prototype.hasOwnProperty.call(Events, eventName)) {
    const event: Event = (Events as unknown as { [key: string]: Event })[
      eventName
    ];
    if (event.once) {
      client.once(event.name, (...args: any[]) => event.execute(...args));
    } else {
      client.on(event.name, (...args: any[]) => event.execute(...args));
    }
    console.log(`[Events] Registered Event - ${eventName}`);
  }
}

client.login(token);
