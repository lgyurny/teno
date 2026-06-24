import { Bot, webhookCallback } from "grammy";
import { InlineKeyboard, Keyboard } from "grammy";
import registerCommands from "./plugins/index.ts";

const bot = new Bot(Deno.env.get("BOT_TOKEN")!);

bot.command("start", (ctx) =>
  ctx.reply("¡Hola desde Deno Deploy! 🦕")
);

//CARGA DE PLUGINS
registerCommands(bot);

// Comando /help
bot.command("help", async (ctx) => {
  await ctx.reply("Comandos disponibles:\n/start - Iniciar\n/help - Ayuda");
});

// Teclado inline (botones en el mensaje)
bot.command("menu", (ctx) => {
  const keyboard = new InlineKeyboard()
    .text("✅ Sí", "accion_si")
    .text("❌ No", "accion_no")
    .row()
    .url("🌐 Web", "https://grammy.dev");

  return ctx.reply("¿Qué quieres hacer?", { reply_markup: keyboard });
});

// Maneja el callback del botón
bot.callbackQuery("accion_si", (ctx) => {
  ctx.editMessageText("¡Elegiste Sí! 🎉");
  ctx.answerCallbackQuery();
});

bot.callbackQuery("accion_no", (ctx) => {
  ctx.editMessageText("¡Elegiste No! 💔");
  ctx.answerCallbackQuery();
});

// Teclado de respuesta (aparece en el teclado del dispositivo)
bot.command("opciones", (ctx) => {
  const kb = new Keyboard()
    .text("📊 Stats").text("⚙️ Config")
    .row()
    .requestContact("📱 Compartir contacto")
    .resized();

  return ctx.reply("Elige:", { reply_markup: kb });
});

// Crea el handler HTTP nativo de Deno
const handleUpdate = webhookCallback(bot, "std/http");

Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Solo acepta en la ruta /webhook
  if (url.pathname === "/webhook" && req.method === "POST") {
    return await handleUpdate(req);
  }
  return new Response("Bot online", { status: 200 });
});
