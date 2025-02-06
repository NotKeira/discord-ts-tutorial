# Discord.js TypeScript Bot Template

A modern Discord bot built with Discord.js and TypeScript.

## Features

- Written in TypeScript for better code quality and developer experience
- Modular command structure
- Environment variables support
- Built-in error handling
- Easy to extend and customize

## Prerequisites

- Node.js 16.9.0 or higher
- pnpm (recommended) or npm
- A Discord bot token ([Discord Developer Portal](https://discord.com/developers/applications))

## Getting Started

1. Clone this repository:

```bash
git clone https://github.com/NotKeira/discord-ts-tutorial
cd discord-ts
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file in the root directory:

```env
TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here

```

4. Build and start the bot:

```bash
pnpm build
pnpm start
```

## Development

- Run in development mode:

```bash
pnpm dev
```

- Lint your code:

```bash
pnpm lint
```

## Project Structure

```
src/
├── commands/     # Bot commands
├── events/       # Discord event handlers
├── utils/       # Utility functions
└── main.ts     # Main entry point
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License - see [LICENSE](/LICENSE) for details.
