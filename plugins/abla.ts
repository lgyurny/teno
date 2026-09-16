import OpenAI from 'openai';
//ESTE COMANDO FUE HECHO CON OPENAI
// commands/llama.js
const llave = Deno.env.get("ABLI_TOKEN");

const openai = new OpenAI({
  baseURL: 'https://api.abliteration.ai/v1',
  apiKey: `${llave}`
});

async function router(texto) {
  const completion = await openai.chat.completions.create({
    model: 'abliterated-model',
    instructions: 'Eres un asistente que debe responder las preguntas del usuario y solo tienes 480 palabras para responder brevente cada pregunta del usuario.',
    messages: [
      {
        role: 'user',
        content: `${texto}`,
      },
    ],
  });
  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}


export default async (ctx) => {

    const userInput = ctx.message.text.replace("/abla", "").trim();

  // Si el usuario no escribió una pregunta después del comando
  if (!userInput) {
    return ctx.reply(
      "❓ Por favor escribe tu pregunta después del comando.\n\nEjemplo:\n/abla ¿Qué productos ofrecen?"
    );
  }

try {
  await ctx.reply("💭 Procesando con Abliteration...");

    const aiResponse = await router(userInput);
    await ctx.reply(aiResponse);
  }catch (error) {
    console.error("❌ Error al procesar /abla:", error);
    ctx.reply("⚠️ Hubo un error al procesar tu pregunta. Intenta más tarde.");
  }
}
