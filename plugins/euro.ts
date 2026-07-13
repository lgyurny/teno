import axios from 'axios'

const llave = Deno.env.get("EURO_TOKEN");

async function euro() {
  try {
    let respuesta = await axios.get(`https://api.exchangeratesapi.io/v1/latest?access_key${llave}&symbols=USD,AUD,CAD,PLN,MXN&format=1`);
    console.log(respuesta); // Aquí están los datos devueltos por la API
     let res = await respuesta.data;
    return res.rates.MXN;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}//fin de euro

export default async (ctx) => {

    const userInput = ctx.message.text.replace("/euro", "").trim();
    const precio = await euro();
    //const precio = Number(usd.toFixed(2));
  // Si el usuario no escribió una pregunta después del comando
  if (!userInput) {
    return ctx.reply(
      `El precio actual del euro es de *${precio} MXN *`,
    { parse_mode: "Markdown" });
  }

try {
  await ctx.reply("💭 Obteniendo el precio del euro...");


    //const aiResponse = res.output[1].content[0].text;
    //console.log(res);
    //const contenido = res.rates.MXN;
    let pesos = Math.round(userInput * precio);

    await ctx.reply(`*${userInput} EUR* equivalen a *${pesos} MXN*`,
    { parse_mode: "Markdown" }
  );
  }catch (error) {
    console.error("❌ Error al procesar /euro:", error);
    ctx.reply("⚠️ Hubo un error al procesar tu pregunta. Intenta más tarde.");
  }

}//Fin de funcion principal
