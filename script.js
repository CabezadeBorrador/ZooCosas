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
  "cinta adhesiva","engrapadora","clip","calendario","maceta","planta","florero","regadera","cubeta","escoba",
  "recogedor","trapo","canasta","termómetro","linterna","bateria","extensión eléctrica","enchufe","cable","cargador"
];

// ===============================
// Utilidades y estado
// ===============================
const $ = (sel) => document.querySelector(sel);
const estado = { animal: null, cosa: null };

function aleatorio(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function setTexto(el, txt) { el.textContent = txt; }

function ruleta(el, fuente, durMs = 900, intervaloMs = 60) {
  // Anima texto como “ruleta” y retorna una promesa con el valor final
  return new Promise((resolve) => {
    el.classList.add('spin');
    let t = 0;
    const timer = setInterval(() => {
      setTexto(el, aleatorio(fuente));
      t += intervaloMs;
      if (t >= durMs) {
        clearInterval(timer);
        const final = aleatorio(fuente);
        el.classList.remove('spin');
        setTexto(el, final);
        resolve(final);
      }
    }, intervaloMs);
  });
}

// ===============================
// PDF (tamaño carta) con jsPDF
// ===============================
async function descargarPDF() {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert("No se pudo cargar el generador de PDF. Revisa tu conexión.");
    return;
  }

  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
  const W = doc.internal.pageSize.getWidth();   // 612 pt
  const H = doc.internal.pageSize.getHeight();  // 792 pt
  const M = 54; // márgen ~0.75"

  // --- Encabezado con más separación ---
doc.setFont('helvetica', 'bold');
doc.setFontSize(32);
const Y_TITLE  = M;          // baja un poco el título
doc.text('ZooCosas', W/2, Y_TITLE, { align: 'center', baseline: 'top' });

doc.setFont('helvetica', 'normal');
doc.setFontSize(12);
const Y_BYLINE = Y_TITLE + 40;    // separación clara (32 pt ≈ 11 mm)
doc.text('~ por Cabeza de Borrador ~', W/2, Y_BYLINE, { align: 'center', baseline: 'top' });

// Línea: “Nombre del personaje”
const yNombre = Y_BYLINE + 42;    // espacio extra antes de la línea
doc.setFontSize(12);
doc.text('Nombre de tu personaje:', M, yNombre, { baseline: 'alphabetic' });
  const lineaX1 = M + 150, lineaX2 = W - M;
  doc.setLineWidth(0.8);
  doc.line(lineaX1, yNombre + 2, lineaX2, yNombre + 2);

// Recuadro grande para dibujar
const boxTop = yNombre + 30;
const boxHeight = H - boxTop - 140;
doc.setDrawColor(180);
doc.setLineWidth(1.2);
doc.roundedRect(M, boxTop, W - 2*M, boxHeight, 8, 8, 'S');


  // Texto inferior centrado con Animal + Cosa
  const animal = estado.animal ?? '—';
  const cosa   = estado.cosa   ?? '—';
  const combo  = `${animal}  +  ${cosa}`;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text(combo, W/2, boxTop + boxHeight + 48, { align: 'center' });

  // Archivo
  const nombreArchivo = `ZooCosas_${animal}_${cosa}.pdf`.replace(/\s+/g, '-');
  doc.save(nombreArchivo);
}

// ===============================
// Eventos UI
// ===============================
window.addEventListener("DOMContentLoaded", () => {
  const btnAnimales = $("#btnAnimales");
  const btnCosas = $("#btnCosas");
  const outAnimal = $("#animalResult");
  const outCosa = $("#cosaResult");
  const btnDesc = $("#downloadBtn");

  btnAnimales.addEventListener("click", async () => {
    btnAnimales.disabled = true;
    estado.animal = await ruleta(outAnimal, ANIMALES, 900, 60);
    btnAnimales.disabled = false;
  });

  btnCosas.addEventListener("click", async () => {
    btnCosas.disabled = true;
    estado.cosa = await ruleta(outCosa, COSAS, 900, 60);
    btnCosas.disabled = false;
  });

  btnDesc.addEventListener("click", descargarPDF);
});
