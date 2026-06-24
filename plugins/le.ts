import { Mistral } from '@mistralai/mistralai';
// commands/mistral.js

const apiKey = Deno.env.get("LE_TOKEN");

const client = new Mistral({apiKey: apiKey});

async function miss(texto) {
    const response = await client.chat.complete({
        model: "mistral-medium-latest",
        messages: [
          {role: 'system', content: 'Eres un asistente que debe responder las preguntas del usuario y solo tienes 480 palabras para responder brevente cada pregunta del usuario.'},
          {role: 'user', content: `${texto}`}
        ]
    });

  console.log(response.choices[0].message.content);
 return response.choices[0].message.content;
}

export default async (ctx) => {

 
    const userInput = ctx.message.text.replace("/mistral", "").trim();

  // Si el usuario no escribió una pregunta después del comando
  if (!userInput) {
    return ctx.reply(
      "❓ Por favor escribe tu pregunta después del comando.\n\nEjemplo:\n/mistral ¿Qué productos ofrecen?"
    );
  }
      
try {
  await ctx.reply("💭 Procesando con Mistral...");

    const aiResponse = await miss(userInput);
    await ctx.reply(aiResponse,
    { parse_mode: "Markdown" }
  );
  }catch (error) {
    console.error("❌ Error al procesar /preguntar:", error);
    ctx.reply("⚠️ Hubo un error al procesar tu pregunta. Intenta más tarde.");
  }    
  
 }

//export default handler;
