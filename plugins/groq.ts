import axios from 'axios'
// commands/groq.ts

const llave = Deno.env.get("GROQ_TOKEN");

export default async (ctx) => {

    const userInput = ctx.message.text.replace("/groq", "").trim();

  // Si el usuario no escribió una pregunta después del comando
  if (!userInput) {
    return ctx.reply(
      "❓ Por favor escribe tu pregunta después del comando.\n\nEjemplo:\n/groq ¿Qué productos ofrecen?"
    );
  }
      
try {
  await ctx.reply("💭 Procesando con Groq...");

  const url = 'https://api.groq.com/openai/v1/responses';

  const body = {
      model: 'qwen/qwen3-32b',
      instructions: "Eres un asistente que debe responder las preguntas del usuario y solo tienes 450 palabras para responder cada pregunta del usuario",
      input: `${userInput}`
  };

  const config = {
    headers: {
      'Authorization': 'Bearer ${llave}',
      'Content-Type': 'application/json'
    }
  };

	//Solicitud POST en Axios
    const respuesta = await axios.post(url, body, config);
    console.log('Respuesta:', respuesta);

	//Para axios se guarda el json automaticamente en respuesta.data
    const aiResponse = respuesta.data.output[1].content[0].text;
    
    //Se imprime resupuesta
    await ctx.reply(aiResponse,
    { parse_mode: "Markdown" }
  );
  }catch (error) {
    console.error("❌ Error al procesar /groq:", error);
    ctx.reply("⚠️ Hubo un error al procesar tu pregunta. Intenta más tarde.");
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }     
    
}//Fin del plugin
//export default handler;
