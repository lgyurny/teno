import Groq from 'groq-sdk';
const llave = Deno.env.get("GROQ_TOKEN");
const client = new Groq({
	apiKey: llave
});


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

	const chatCompletion = await client.chat.completions.create({
				messages: [{ role: 'user', content: userInput }],
				model: 'groq/compound',
			});
	console.log(chatCompletion); // Aquí están los datos devueltos por la API
    //model: 'openai/gpt-oss-20b',
    
	//Para axios se guarda el json automaticamente en respuesta.data
    const aiResponse = chatCompletion.choices[0].message.content;
    console.log(chatCompletion.choices[0].message.content);  

    
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
