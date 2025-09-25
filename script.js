// ===============================
// Datos: 100 Animales + 100 Cosas
// ===============================

// 100 ANIMALES (comunes y reconocibles para primaria)
const ANIMALES = [
  // 1–20
  "perro","gato","vaca","caballo","oveja","cabra","cerdo","gallina","gallo","pollito",
  "pato","ganso","pavo","paloma","canario","loro","águila","halcón","búho","colibrí",
  // 21–40
  "pingüino","flamenco","avestruz","tucán","cuervo","quetzal","golondrina","murciélago","ratón","ardilla",
  "conejo","liebre","zorro","lobo","oso","panda","koala","canguro","elefante","rinoceronte",
  // 41–60
  "hipopótamo","jirafa","cebra","león","tigre","leopardo","jaguar","puma","nutria","castor",
  "zorillo","mapache","ciervo","venado","alce","reno","camello","zorro","llama","alpaca",
  // 61–80
  "mono","chimpancé","gorila","orangután","perezoso","delfín","ballena","orca","tiburón","pez payaso",
  "pez dorado","pez espada","mantarraya","caballito de mar","pulpo","calamar","cangrejo","langosta","camarón","medusa",
  // 81–100
  "estrella de mar","erizo de mar","foca","lobo marino","morsa","caracol","babosa","mariposa","oruga","abeja",
  "avispa","abejorro","mosca","mosquito","libélula","mariquita","saltamontes","grillo","hormiga","escarabajo",
  "cucaracha","araña","alacrán","iguana","lagarto","cocodrilo","ajolote","tortuga","sapo","rana"
];

// 100 COSAS (objetos cotidianos)
const COSAS = [
  // 1–20
  "libro","cuaderno","lápiz","lapicero","borrador","sacapuntas","regla","tijeras","pegamento","mochila",
  "mesa","silla","escritorio","computadora","teclado","ratón","pantalla","teléfono","tableta","reloj",
  // 21–40
  "gafas","botella","vaso","taza","plato","cuchara","tenedor","cuchillo","sartén","olla",
  "microondas","estufa","refrigeradora","lavamanos","toalla","jabón","cepillo de dientes","pasta dental","peine","espejo",
  // 41–60
  "cama","almohada","colcha","lámpara","foco","ventilador","puerta","ventana","cortina","alfombra",
  "zapato","calcetín","camisa","pantalón","vestido","gorra","sombrero","chumpa","paraguas","bolsa",
  // 61–80
  "cartera","billetera","llaves","piano","guitarra","tambor","flauta","radio","televisor","cámara",
  "bicicleta","patineta","patines","cometa","dron","carro","autobús","tren","avión","barco",
  // 81–100
  "lancha","motocicleta","casco","semáforo","señal","crayones","marcadores","pintura","pincel","papel",
  "cinta adhesiva","grapadora","clip","calendario","maceta","planta","florero","regadera","cubeta","escoba",
  "recogedor","trapo","canasta","termómetro","linterna","bateria","extensión eléctrica","enchufe","cable","cargador"
];

// ===============================
// Lógica de UI
// ===============================
const $ = (sel) => document.querySelector(sel);
const estado = {
  categoria: null,   // "Animales" | "Cosas"
  valor: null        // último elemento generado
};

function aleatorio(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function mostrarResultado(texto) {
  $("#resultado").textContent = texto || "—";
}

function generar(categoria) {
  estado.categoria = categoria;
  if (categoria === "Animales") {
    estado.valor = aleatorio(ANIMALES);
  } else if (categoria === "Cosas") {
    estado.valor = aleatorio(COSAS);
  } else {
    estado.valor = null;
  }
  mostrarResultado(estado.valor ? `${estado.valor}` : "—");
}

function descargarHoja() {
  const titulo = "Bestiario — Hoja para imprimir";
  const subtitulo = estado.categoria
    ? `${estado.categoria}: ${estado.valor ?? "—"}`
    : "Selecciona una categoría";

  const contenido = `
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<title>${titulo}</title>
<style>
  @page { size: A4; margin: 18mm; }
  body { font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#111; }
  h1 { margin:0 0 6px; font-size:26px; }
  p { margin:0 0 14px; color:#555; }
  .sheet { border:1px solid #ddd; padding:16px; border-radius:12px; }
  .marca { font-style: italic; color:#777; margin-bottom:14px; }
  .campo {
    height: 640px; border:1px dashed #bbb; border-radius:8px; margin-top:8px;
    display:flex; align-items:center; justify-content:center;
    font-size: 48px; font-weight: 800; letter-spacing:.02em;
    text-align:center; padding:16px;
  }
  .footer { margin-top:16px; font-size:12px; color:#888; }
</style>
</head>
<body>
  <h1>Bestiario</h1>
  <p class="marca">~ por Cabeza de Borrador ~</p>
  <div class="sheet">
    <p>${subtitulo}</p>
    <div class="campo">${estado.valor ?? "—"}</div>
  </div>
  <div class="footer">Generado para impresión</div>
  <script>window.onload = () => window.print();<\/script>
</body>
</html>`.trim();

  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) return;
  w.document.write(contenido);
  w.document.close();
}

// ===============================
// Enlaces de eventos
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  $("#btnAnimales")?.addEventListener("click", () => generar("Animales"));
  $("#btnCosas")?.addEventListener("click", () => generar("Cosas"));
  $("#downloadBtn")?.addEventListener("click", descargarHoja);
  mostrarResultado("—");
});
