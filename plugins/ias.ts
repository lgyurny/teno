export default (ctx) => {
  ctx.reply(
    "*Modelos Disponibles:*\n/gemini\n/groq\n/open\n/mistral\n/dolar\n/euro",
    { parse_mode: "Markdown" }
  );
};
