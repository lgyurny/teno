import local from "./local.ts";
import mistral from "./mistral.ts";
import groq from "./groq.ts";
import dolar from "./dolar.ts";
import gemini from "./gemini.ts";
import open from "./open.ts";
import ias from "./ias.ts";

export default function registerCommands(bot) {
  bot.command("local", local);
  bot.command("mistral", mistral);
  bot.command("groq", groq);
  bot.command("dolar", dolar);
  bot.command("gemini", gemini);
  bot.command("open", open);
  bot.command("ias", ias);
} 
