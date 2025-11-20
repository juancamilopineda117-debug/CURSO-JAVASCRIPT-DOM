export const COP = new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" });

export const suma = xs => xs.reduce((a, n) => a + n, 0);
export const promedio = xs => (xs.length ? suma(xs) / xs.length : 0);

// Agrupar por categoría con reduce (sin mutar)
export function totalPorCategoria(items) {
  return items.reduce((acc, g) => { //acc es el acumulador osea el objeto que vamos creando y g es el gasto actual
    const key = g.categoria ?? "sin-categoria"; //?? operador de coalescencia nula, si g.categoria es null o undefined, se usa "sin-categoria"
    const nuevo = { ...acc }; //  creamos una copia del acumulador para no mutar el original
    nuevo[key] = (nuevo[key] ?? 0) + g.monto;
    return nuevo;
  }, {});
}
// ejemplo totasPorCategoria([{monto:100, categoria:"a"},{monto:200, categoria:"b"},{monto:50, categoria:"a"}])
// devuelve {a:150, b:200}

// Mínimo y máximo
export function minMax(items) {
  if (items.length === 0) return { min: 0, max: 0 };
  const montos = items.map(g => g.monto);
  return { min: Math.min(...montos), max: Math.max(...montos) };
}

// Top categoría por monto total
export function topCategoria(items) {
  const mapa = totalPorCategoria(items);
  const pares = Object.entries(mapa); // [[categoria, total], ...]
  if (pares.length === 0) return { categoria: null, total: 0 };
  const [categoria, total] = pares.reduce((best, cur) => (cur[1] > best[1] ? cur : best));
  return { categoria, total };
}

// Ejemplo topCategoria([{monto:100, categoria:"a"},{monto:200, categoria:"b"},{monto:50, categoria:"a"}])
// devuelve {categoria:"b", total:200}
