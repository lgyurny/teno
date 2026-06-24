import local from "./local.ts";
import le from "./le.ts";
import groq from "./groq.ts";
import dolar from "./dolar.ts";

export default function registerCommands(bot) {
  bot.command("local", local);
  bot.command("le", le);
  bot.command("groq", groq);
  bot.command("dolar", dolar);
} 
