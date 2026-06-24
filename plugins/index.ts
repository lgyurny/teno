import local from "./local.ts";
import le from "./le.ts";
import groq from "./groq.ts";
import dolar from "./dolar.ts";
import gemini from "./gemini.ts";
import open from "./open.ts";

export default function registerCommands(bot) {
  bot.command("local", local);
  bot.command("le", le);
  bot.command("groq", groq);
  bot.command("dolar", dolar);
  bot.command("gemini", gemini);
  bot.command("open", open);
} 
