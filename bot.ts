import { Bot } from "grammy";
import { InlineKeyboard, Keyboard } from "grammy";
import registerCommands from "./plugins/index.ts";

// Create an instance of the `Bot` class and pass your bot token to it.
export const bot = new Bot(Deno.env.get("BOT_TOKEN")!); // <-- put your bot token between the ""
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

//CARGA DE PLUGINS
registerCommands(bot);

//------------------ MENU UNO
// Comando /start//
bot.command("start", async (ctx) => {
  const name = ctx.from?.first_name ?? "amigo";

  const keyboard = new InlineKeyboard()
    .text("📖 Ayuda", "cb:help")
    .text("⚙️ Config", "cb:config")
    .row()
    .text("📊 Mi perfil", "cb:profile");

  await ctx.reply(
    `👋 ¡Hola, ${name}!\n\nSoy un bot corriendo en Deno Deploy 🦕\nElige una opción:`,
    { reply_markup: keyboard },
  );
});

bot.callbackQuery("cb:help", async (ctx) => {
  await ctx.editMessageText(
    "📖 *Ayuda*\n\n" +
      "Este bot está construido con grammY y desplegado en Deno Deploy.\n\n" +
      "*Comandos:*\n" +
      "/start — Menú principal\n" +
      "/ayuda — Esta pantalla\n" +
      "/perfil — Tu perfil",
    {
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard().text("← Volver", "cb:back"),
    },
  );
  // Responder el callback es obligatorio
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("cb:back", async (ctx) => {
  const name = ctx.from?.first_name ?? "amigo";

  const keyboard = new InlineKeyboard()
    .text("📖 Ayuda", "cb:help")
    .text("⚙️ Config", "cb:config")
    .row()
    .text("📊 Mi perfil", "cb:profile");

  await ctx.editMessageText(
    `👋 ¡Hola, ${name}!\n\nSoy un bot corriendo en Deno Deploy 🦕\nElige una opción:`,
    { reply_markup: keyboard },
  );
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("cb:config", async (ctx) => {
  //const { language } = ctx.session;
    const { language } = "es";

  await ctx.editMessageText(
    `⚙️ *Configuración*\n\nIdioma actual: ${language === "es" ? "🇪🇸 Español" : "🇬🇧 English"}`,
    {
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard()
        .text("🇪🇸 Español", "cb:lang:es")
        .text("🇬🇧 English", "cb:lang:en")
        .row()
        .text("← Volver", "cb:back"),
    },
  );
  await ctx.answerCallbackQuery();
});

bot.callbackQuery("cb:profile", async (ctx) => {
  //const { messageCount, language } = ctx.session;
  const name = ctx.from?.first_name ?? "Usuario";
  const messageCount = 5;
  const language = "es";

  await ctx.editMessageText(
    `👤 *${name}*\n\n📨 Mensajes: ${messageCount}\n🌍 Idioma: ${language}`,
    {
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard().text("← Volver", "cb:back"),
    },
  );
  await ctx.answerCallbackQuery();
});

// Comando /help
bot.command("help", async (ctx) => {
  await ctx.reply("Comandos disponibles:\n/start - Iniciar\n/help - Ayuda");
});

//---------------- MENU DOS --------
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


//------------------------ MENU TRES ------------------
// Teclado de respuesta (aparece en el teclado del dispositivo)
bot.command("ajustes", (ctx) => {
  const kb = new Keyboard()
    .text("📊 Stats").text("⚙️ Config")
    .row()
    .requestContact("📱 Compartir contacto")
    .resized();

  return ctx.reply("Elige:", { reply_markup: kb });
});


//RESPONDE EL BOTÓN CONFIG
bot.hears("⚙️ Config", async (ctx) => {
  // `reply` is an alias for `sendMessage` in the same chat (see next section).
  await ctx.reply("Configuraciones", {
    // `reply_parameters` specifies the actual reply feature.
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

//RESPUESTA DE CONFIG
bot.hears("📊 Stats", async (ctx) => {
  await ctx.reply("Estadisticas", {
    reply_parameters: { message_id: ctx.msg.message_id },
  });
});

// Echo: responde a cualquier texto que no sea comando
bot.on("message:text", async (ctx) => {
  const textoUsuario = ctx.message.text;
  await ctx.reply(`Dijiste: ${textoUsuario}`);
});


// Funcion para responder mensaje que envie un usuario
//bot.on("message", (ctx) => ctx.reply("Got another message!"));
