import { GoogleGenAI } from '@google/genai';
// commands/gemini.ts

const llave = Deno.env.get("GOOGLE_TOKEN");
const ai = new GoogleGenAI({apiKey: `${llave}`});

async function gemma(texto) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `${texto}`,
      config: {
      systemInstruction: "Eres un asistente que debe responder las preguntas del usuario y solo tienes 480 palabras para responder brevente cada pregunta del usuario.",
    },
  });
  console.log(response.text);
 return response.text;
}

export default async (ctx) => {
 
    const userInput = ctx.message.text.replace("/gemini", "").trim();

  // Si el usuario no escribió una pregunta después del comando
  if (!userInput) {
    return ctx.reply(
      "❓ Por favor escribe tu pregunta después del comando.\n\nEjemplo:\n/gemini ¿Qué productos ofrecen?"
    );
  }
      
try {
  await ctx.reply("💭 Procesando con Gemini...");

    const aiResponse = await gemma(userInput);
    await ctx.reply(aiResponse);
  }catch (error) {
    console.error("❌ Error al procesar /gemini:", error);
    ctx.reply("⚠️ Hubo un error al procesar tu pregunta. Intenta más tarde.");
  }        
}
