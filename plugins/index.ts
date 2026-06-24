import local from "./local.ts";

export default function registerCommands(bot) {
  bot.command("local", local);
} 
