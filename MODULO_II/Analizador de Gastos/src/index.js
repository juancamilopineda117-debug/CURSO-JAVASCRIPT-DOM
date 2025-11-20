import { gastos } from "./data.js";
import { COP, promedio, totalPorCategoria, minMax, topCategoria, suma } from "./stats.js";

function analizarGastos(items) {
  const total = suma(items.map(g => g.monto));
  const prom  = promedio(items.map(g => g.monto));
  const porCat = totalPorCategoria(items);
  const { min, max } = minMax(items);
  const top = topCategoria(items);

  return { total, prom, porCat, min, max, top };
}

// Mostrar (consola)
const res = analizarGastos(gastos);
console.log("=== ANÁLISIS DE GASTOS ===");
console.table({
  "Total": COP.format(res.total),
  "Promedio": COP.format(res.prom),
  "Mínimo": COP.format(res.min),
  "Máximo": COP.format(res.max),
  "Top categoría": `${res.top.categoria} (${COP.format(res.top.total)})`
});
console.log("Totales por categoría:", Object.fromEntries(
  Object.entries(res.porCat).map(([k,v]) => [k, COP.format(v)])
));
