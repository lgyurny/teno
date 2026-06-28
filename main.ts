import { bot } from './bot.ts';
import { webhookCallback } from "grammy";

// Start the bot.
//bot.start();

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
