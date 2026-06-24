export default (ctx) => {
  ctx.reply(
    "📍 *Ubicación de la empresa:*\nAv. Ejemplo #123, CDMX\n\n🕓 Horarios: Lunes a Viernes, 9:00–18:00",
    { parse_mode: "Markdown" }
  );
};
