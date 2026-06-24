import local from "./local.ts";
import le from "./le.ts";

export default function registerCommands(bot) {
  bot.command("local", local);
  bot.command("le", le);
} 
