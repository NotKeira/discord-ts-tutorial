const Colours = {
  RED: "\x1b[31m",
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  BLUE: "\x1b[34m",
  MAGENTA: "\x1b[35m",
  CYAN: "\x1b[36m",
  WHITE: "\x1b[37m",
  RESET: "\x1b[0m",
};

type LogLevel =
  | "Database"
  | "Error"
  | "Info"
  | "Warn"
  | "Ready"
  | "Events"
  | "Commands";

const levels: Record<LogLevel, string> = {
  Database: Colours.CYAN,
  Events: Colours.MAGENTA,
  Commands: Colours.YELLOW,
  Ready: Colours.GREEN,
  Error: Colours.RED,
  Warn: Colours.YELLOW,
  Info: Colours.BLUE,
};

function applyColour(level: LogLevel, message: string): string {
  const colour = levels[level] || Colours.RESET;
  return `${colour}[${level}]${Colours.RESET} ${message}`;
}

const logger = {
  log: console.log,
  error: console.error,
  warn: console.warn,
};

console.log = (...args: any[]) => {
    if (args[0] && typeof args[0] === "string" && args[0].startsWith("[")) {
        const level = args[0].match(/\[([a-zA-Z]+)\]/)?.[1] as LogLevel;
        if (level) {
            const message = args[0].slice(level.length + 2);
            args[0] = applyColour(level, message);
        }
    }
    logger.log(...args, Colours.RESET);
}

console.error = (...args: any[]) => {
    if (args[0] && typeof args[0] === "string" && args[0].startsWith("[")) {
      const level = args[0].match(/\[([a-zA-Z]+)\]/)?.[1] as LogLevel;
      if (level) {
        const message = args[0].slice(level.length + 2);
        args[0] = applyColour(level, message);
      }
    }
    logger.error(...args, Colours.RESET);
  };

  console.warn = (...args: any[]) => {
    if (args[0] && typeof args[0] === "string" && args[0].startsWith("[")) {
      const level = args[0].match(/\[([a-zA-Z]+)\]/)?.[1] as LogLevel;
      if (level) {
        const message = args[0].slice(level.length + 2);
        args[0] = applyColour(level, message);
      }
    }
    logger.warn(...args, Colours.RESET);
  };
  