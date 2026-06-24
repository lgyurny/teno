import axios from 'axios'

const llave = Deno.env.get("DOLAR_TOKEN");

async function dolar() {
  try {
    let respuesta = await axios.get(`https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${llave}&symbols=MXN,GBP,EUR,USD`);
    console.log(respuesta); // Aquí están los datos devueltos por la API

     let res = await respuesta.data;
    return res.rates.MXN;
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}

export default async (ctx) => {

    const userInput = ctx.message.text.replace("/dolar", "").trim();
    const precio = await dolar();
    //const precio = Number(usd.toFixed(2));
  // Si el usuario no escribió una pregunta después del comando
  if (!userInput) {
    return ctx.reply(
      `El precio actual del dolar es de *${precio} MXN *`,
    { parse_mode: "Markdown" });
  }

try {
  await ctx.reply("💭 Obteniendo el precio del dólar...");


    //const aiResponse = res.output[1].content[0].text;
    //console.log(res);
    //const contenido = res.rates.MXN;
    let pesos = Math.round(userInput * precio);

    await ctx.reply(`*${userInput} USD* equivalen a *${pesos} MXN*`,
    { parse_mode: "Markdown" }
  );
  }catch (error) {
    console.error("❌ Error al procesar /dolar:", error);
    ctx.reply("⚠️ Hubo un error al procesar tu pregunta. Intenta más tarde.");
  }

}//Fin de funcion principal
