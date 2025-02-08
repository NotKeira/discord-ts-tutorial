import { Events, Client} from "discord.js";

export const Ready = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client): void {
        const info: string[] = [
            `Client is Ready`,
            `Logged in as ${client.user?.tag}`,
        ];
        for (const line of info) {
            console.log(`[Ready] ${line}`)
        }
    }
}