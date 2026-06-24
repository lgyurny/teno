import axios from 'axios'
// commands/mistral.js
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
      'Authorization': 'Bearer ',
      'Content-Type': 'application/json'
    }
  };

    const respuesta = await axios.post(url, body, config);
    console.log('Respuesta:', respuesta);
    //return respuesta.data;


    //let res = await apii.json()

    const aiResponse = respuesta.output[1].content[0].text;
    await ctx.reply(aiResponse,
    { parse_mode: "Markdown" }
  );
  }catch (error) {
    console.error("❌ Error al procesar /preguntar:", error);
    ctx.reply("⚠️ Hubo un error al procesar tu pregunta. Intenta más tarde.");
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }    
  
    
  }

//export default handler;
