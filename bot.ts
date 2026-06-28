import { Bot } from "grammy";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(Deno.env.get("BOT_TOKEN")!); // <-- put your bot token between the ""
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
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
// Handle other messages.
bot.on("message", (ctx) => ctx.reply("Got another message!"));

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();
